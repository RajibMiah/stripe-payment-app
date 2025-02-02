import Stripe from 'stripe';

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
        return customer;
    } catch (error: any) {
        console.log('error:', error.message);
    }
};
