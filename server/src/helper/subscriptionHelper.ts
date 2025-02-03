import Stripe from 'stripe';
import cardDetails from '../models/cardDetails';
import dotenv from 'dotenv';

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

interface CardData {
    id: string;
    name: string;
    brand: string;
    month: number;
    exp_year: number;
}

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
