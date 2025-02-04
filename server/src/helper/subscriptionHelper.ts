import Stripe from 'stripe';
import cardDetails from '../models/cardDetails';
import dotenv from 'dotenv';
import { CardData } from '../types/subscription';
import { formatDate } from '../utilites/data';
import subscriptionDetails from '../models/subscriptionDetails';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

export const createCustomer = async (
    name: string,
    email: string,
    token_id: string
) => {
    try {
        const customer = stripe.customers.create({
            name,
            email,
            source: token_id,
        });

        return {
            success: true,
            data: customer,
        };
    } catch (error: any) {
        return {
            success: false,
            msg: error.message,
        };
    }
};

export const saveCardDetails = async (
    data: CardData | any,
    user_id: string,
    customer_id: string
) => {
    try {
        const saveCardDetails = await new cardDetails({
            user_id,
            customer_id,
            card_id: data.id,
            name: data.name ? data.name : '',
            brand: data.brand,
            month: data.month,
            year: data.exp_year,
        });

        await saveCardDetails.save();

        return {
            success: true,
            data: saveCardDetails,
        };
    } catch (error: any) {
        return {
            success: false,
            msg: error.message,
        };
    }
};

export const monthlyTrialSubscription = async (
    customer_id: string,
    user_id: string,
    subscriptionPlan: any
) => {
    try {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(futureDate.getDate() + subscriptionPlan.trial_days);
        futureDate.setHours(23, 59, 59, 999);

        const current_period_start = formatDate(currentDate);
        const current_period_end = formatDate(futureDate);

        const subscriptionData = {
            user_id,
            stripe_subscription_id: null,
            stripe_subscription_schedule_id: null,
            stripe_customer_id: customer_id,
            subscription_plan_price_id: subscriptionPlan.stripe_price_id,
            plan_amount: subscriptionPlan.amount,
            plan_amount_currency: 'usd',
            plan_interval: 'month',
            plan_interval_count: 1,
            created: current_period_start,
            plan_period_start: current_period_start,
            plan_period_end: current_period_end,
            trial_end: subscriptionPlan.trial_days,
            status: 'active',
        };

        const subDetails = new subscriptionDetails(subscriptionData);

        return await subDetails.save();
    } catch (error: any) {
        console.log('error from monthly subscription', error);
        return null;
    }
};
