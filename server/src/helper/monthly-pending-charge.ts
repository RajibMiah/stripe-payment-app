import { SubscriptionPlanType } from '../types/subscription';
import { getCurrentDay, getDaysInMonth } from '../utilites/formator';
import PendingFees from '../models/pandingFees';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

export const captureMonthlyPendingFees = async (
    customer_id: string,
    user_id: string,
    user_name: string,
    subscriptionPlan: SubscriptionPlanType
) => {
    try {
        const planAmount = subscriptionPlan.amount;
        const daysInMonth = getDaysInMonth();
        const currentDay = getCurrentDay();

        const ammountForRestDays = Math.ceil(
            daysInMonth - (currentDay - 1) * (planAmount / daysInMonth)
        );

        const charge = stripe.charges.create({
            amount: ammountForRestDays * 100,
            currency: 'usd',
            customer: customer_id,
            description: 'Monthly pending fees charged',
            shipping: {
                name: user_name,
                address: {
                    line1: ' 123 monasdf',
                    line2: 'apt asdf',
                    city: ' anywhere',
                    state: 'NY',
                    postal_code: '3024',
                    country: 'US',
                },
            },
        }) as any;

        const pendingFees = new PendingFees({
            user_id,
            charge_id: charge.id,
            customer_id,
            amount: ammountForRestDays,
        });

        const captureChargedData = await pendingFees.save();

        return captureChargedData;
    } catch (error) {
        console.log('pandding subscription error: ', error);
        return null;
    }
};
