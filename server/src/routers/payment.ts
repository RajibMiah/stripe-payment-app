import express from 'express';
import Stripe from 'stripe';
import { authMiddleware } from '../middlewares/authMiddleware';
import {subscription} from '../controllers/paymentController';
const router = express.Router();


router.post('/create-checkout-session', authMiddleware , subscription);

router.post('/create-one-time-payment', async (req, res) => {
    const { priceId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/create-trial-subscription', async (req, res) => {
    const { customerId, priceId } = req.body;

    try {
        // Create a subscription with a trial period
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceId,
                },
            ],
            trial_period_days: 7, // Free trial period
        });

        res.json({ id: subscription.id });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});
export default router;