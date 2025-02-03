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
} from '../types/subscription';
import SubscriptionDetails from '../models/subscriptionDetails';
import { createCustomer, saveCardDetails } from '../helper/subscriptionHelper';
import dotenv from 'dotenv';
import { UserJwtToken } from '../types/user';
import { convertFullName } from '../utilites/user';

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
                msg: 'Errors',
                errors: errors.array(),
            });
        }

        const { name, stripe_price_id, trail_days, have_trial, amount, type } =
            req.body;

        const subscriptionPlan = new SubscriptionPlan({
            name,
            stripe_price_id,
            trail_days,
            have_trial,
            amount,
            type,
        });

        const planData = await subscriptionPlan.save();

        return res.status(200).json({
            success: true,
            message: 'Subscription Plan added',
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
                message: 'Something went wrong',
            });
        }

        const { plan_id } = req.body;

        const planDetails = await SubscriptionPlan.findById(plan_id);
        if (!planDetails) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong',
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
            subs_msg = `You will get ${planDetailsTyped.trail_days} days trial, and after we will charge you ${planDetailsTyped.amount} for ${planDetailsTyped.name} subscription plan.`;
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
            message: 'something went wrong',
        });
    }
};

export const createSubscription: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors,
            });
        }
        // HERE ID MEANS USER CREATE TOKEN ID
        const { id, card } = (req as AuthenticatedRequest)
            .body as CreateSubscriptionRequestBody;
        const { firstName, last_name, email } = (req as AuthenticatedRequest)
            .user as any;

        const userData = (req as AuthenticatedRequest).user as UserJwtToken;

        if (!id || !firstName || !last_name || !email) {
            console.log(
                'subscription  ID, name, or email is missing in the request'
            );
        }

        // CREATE A STRIPE CUSTOMER ID
        const stipe_new_customer = await createCustomer(
            convertFullName(firstName, last_name),
            email,
            id
        );

        if (!(await stipe_new_customer).success) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong',
            });
        }
        const customer = (await stipe_new_customer).data as unknown as any;
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: 'User data is missing',
            });
        }
        if (!customer) {
            return res.status(400).json({
                success: false,
                message: 'Customer creation failed',
            });
        }

        // NOTE: CARD DETAILS SAVE
        const cardDetails = await saveCardDetails(
            card,
            userData.id,
            customer?.id
        );
        if (!cardDetails.success) {
            return res.status(200).json({
                success: false,
                message: 'Card details is not saved',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'New subscribe customer created',
            data: cardDetails,
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
