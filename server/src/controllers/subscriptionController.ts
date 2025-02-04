/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import Stripe from 'stripe';
import { AuthenticatedRequest } from '../types/global';
import { StoreItem, storeItems } from '../../constrains/dumy.db';
import useSubscription from '../models/subscription';
import SubscriptionPlan from '../models/subscriptionPlan';
import { validationResult } from 'express-validator';
import {
    AddPlanRequestBody,
    CreateSubscriptionRequestBody,
    subscriptionPlan,
} from '../types/subscription';
import SubscriptionDetails from '../models/subscriptionDetails';
import {
    createCustomer,
    monthlyTrialSubscription,
    saveCardDetails,
} from '../helper/subscriptionHelper';
import dotenv from 'dotenv';
import { UserJwtToken } from '../types/user';
import { convertFullName } from '../utilites/user';
import {
    createStripeCustomer,
    findSubscriptionPlan,
    saveCardDetailsHelper,
    validateRequest,
} from '../helper/create-subscription-helper';

// Initialize Stripe with the secret key from environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

export const addPlan: RequestHandler = async (
    req: Request<{}, {}, AddPlanRequestBody>,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
        }

        const { name, stripe_price_id, trial_days, have_trial, amount, type } =
            req.body;

        const subscriptionPlan = new SubscriptionPlan({
            name,
            stripe_price_id,
            trial_days,
            have_trial,
            amount,
            type,
        });

        const planData = await subscriptionPlan.save();

        return res.status(200).json({
            success: true,
            message: 'Subscription Plan added successfully',
            data: planData,
        });
    } catch (error: any) {
        next(error);
        return res.status(400).json({
            success: false,
            message: error?.message as string,
        });
    }
};

export const getPlans: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const plans = await SubscriptionPlan.find();

        return res.status(200).json({
            success: true,
            message: 'Get all subscription plans',
            data: plans,
        });
    } catch (errors: any) {
        next(errors);
        return res.status(400).json({
            success: false,
            message: errors.message as string,
        });
    }
};

export const getPlanDetails: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
        }

        const { plan_id } = req.body;

        const planDetails = await SubscriptionPlan.findById(plan_id);
        if (!planDetails) {
            return res.status(404).json({
                success: false,
                message: 'Subscription plan not found',
            });
        }

        const user_id = (req as AuthenticatedRequest).user?.id;
        if (!user_id) {
            console.log('undefined auth user id, should login first');
        }

        const haveBuyedAnyPlan = await SubscriptionDetails.countDocuments({
            user_id,
        });

        let subs_msg: string;
        const planDetailsTyped = planDetails.toObject() as any;

        if (haveBuyedAnyPlan == 0 && planDetailsTyped?.have_trial === true) {
            subs_msg = `You will get ${planDetailsTyped.trial_days} days trial, and after we will charge you ${planDetailsTyped.amount} for ${planDetailsTyped.name} subscription plan.`;
        } else {
            subs_msg = ` we will charge you ${planDetailsTyped.amount} for ${planDetailsTyped.name} subscription plan.`;
        }

        return res.status(200).json({
            success: true,
            message: subs_msg,
            data: planDetails,
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            success: false,
            message:
                'An unexpected error occurred while fetching the subscription plan details.',
        });
    }
};

export const createSubscription: RequestHandler = async (
    req: Request<{}, {}, CreateSubscriptionRequestBody>,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        // Validate request
        const validationError = validateRequest(req);
        if (validationError) {
            return res.status(400).json(validationError);
        }

        const { plan_id, card_data } = req.body;
        const { firstName, lastName, email } = (req as AuthenticatedRequest)
            .user as any;
        const userData = (req as AuthenticatedRequest).user as UserJwtToken;

        if (!plan_id || !firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message:
                    'Subscription ID, name, or email is missing in the request',
            });
        }

        // Find subscription plan
        const subscriptionPlan = await findSubscriptionPlan(plan_id);
        if (!(subscriptionPlan as any)?.success) {
            return res.status(400).json(subscriptionPlan);
        }

        // Create Stripe customer
        const customer = (await createStripeCustomer(
            firstName,
            lastName,
            email,
            card_data.id
        )) as any;
        if (!customer.success) {
            return res.status(400).json(customer);
        }

        // Create subscription
        let subscriptionData = null;
        if ((subscriptionPlan as subscriptionPlan).type === 0) {
            subscriptionData = monthlyTrialSubscription(
                customer.id,
                userData.id,
                subscriptionPlan
            );
        } else if ((subscriptionPlan as subscriptionPlan).type === 1) {
            // yearly trial
        } else if ((subscriptionPlan as subscriptionPlan).type === 2) {
            // lifetime trial
        }

        // Save card details
        const cardDetails = await saveCardDetailsHelper(
            card_data.card,
            userData.id,
            customer.id
        );
        if (!cardDetails.success) {
            return res.status(400).json(cardDetails);
        }

        return res.status(200).json({
            success: true,
            message: 'New subscribe customer created',
            data: subscriptionData,
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

/**
 * Handles subscription-based checkout session creation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const subscription: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { priceId } = req.body;
    if (!priceId) {
        return res.status(400).json({ message: 'Price ID is required' });
    }

    try {
        const session: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: req.body.items.map((item: StoreItem) => {
                    const storeItem = storeItems.get(item.id);
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItem?.name,
                            },
                            unit_amount: storeItem?.priceInCents,
                        },
                    };
                }),
                subscription_data: {
                    trial_end: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                    recurring: { interval: 'month' },
                },
                success_url: `${req.user?.originPath || req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.user?.originPath || req.headers.origin}/payment-cancel`,
            } as any);

        res.json({ id: session.id });
    } catch (error: unknown) {
        next(error);
        res.status(500).json({ error: (error as Error).message });
    }
};

/**
 * Handles one-time payment checkout session creation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const oneTimePayment: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const session: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: req.body.items.map((item: StoreItem) => {
                    const storeItem = storeItems.get(item.id);
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItem?.name,
                            },
                            unit_amount: storeItem?.priceInCents,
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${req.user?.originPath || req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.user?.originPath || req.headers.origin}/payment-cancel`,
            });
        if (session.id) {
            const newSubscription = new useSubscription({});
        }
        res.json({ id: session.id });
    } catch (error: unknown) {
        next(error);
        res.status(500).json({ error: (error as Error).message });
    }
};

/**
 * Creates a subscription with a trial period
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const trialSubscription: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { customerId, priceId } = req.body;

    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceId,
                },
            ],
            trial_period_days: 7, // Free trial period
            // recurring_amount: 100,
            // recurring: { interval: 'month' },
        });

        res.json({ id: subscription.id });
    } catch (error: unknown) {
        next(error);
        res.status(500).json({ error: (error as Error).message });
    }
};
