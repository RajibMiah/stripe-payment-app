/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../types/global';
import { StoreItem, storeItems } from '../../constrains/dumy.db';
import useSubscription from '../models/subscription';
import SubscriptionPlan from '../models/subscriptionPlan';
// Initialize Stripe with the secret key from environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

/**
 * Handles one-time payment checkout session creation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */

export const addPlan = async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            msg: error?.message as string,
        });
    }
};

/**
 * Handles subscription-based checkout session creation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const subscription = async (
    req: AuthenticatedRequest,
    res: Response
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
        res.status(500).json({ error: (error as Error).message });
    }
};

/**
 * Handles one-time payment checkout session creation
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const oneTimePayment = async (
    req: AuthenticatedRequest,
    res: Response
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
        res.status(500).json({ error: (error as Error).message });
    }
};

/**
 * Creates a subscription with a trial period
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const trialSubscription = async (
    req: AuthenticatedRequest,
    res: Response
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
        res.status(500).json({ error: (error as Error).message });
    }
};
