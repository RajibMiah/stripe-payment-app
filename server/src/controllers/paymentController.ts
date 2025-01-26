import { Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../types/global';

// Initialize Stripe with the secret key from environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

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
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'My product',
                            },
                            unit_amount: 100,
                        },
                        quantity: 1,
                    },
                ],
                subscription_data: {
                    trial_end: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                    recurring: { interval: 'month' },
                },
                success_url: `${req.user?.originPath || req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.user?.originPath || req.headers.origin}/cancel`,
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
    const { priceId } = req.body;

    try {
        const session: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'My product',
                            },
                            unit_amount: 100,
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${req.user?.originPath || req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.user?.originPath || req.headers.origin}/cancel`,
            });

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
