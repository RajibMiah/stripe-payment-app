'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Dummy Product Data
const product = {
    id: 'product_123',
    name: 'Pro Subscription',
    description: 'Get unlimited access to all premium features.',
    price: 20.0,
    currency: 'USD',
    image: 'https://via.placeholder.com/200',
};

// Checkout Form Component
const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        const { error: stripeError } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/success` },
        });

        if (stripeError) {
            setError(stripeError.message || 'Payment failed');
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <PaymentElement />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    {loading ? 'Processing...' : `Pay $${product.price}`}
                </button>
            </form>
        </div>
    );
};

// Main Checkout Page
const Checkout: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl">
                    {/* Left: Product Info */}
                    <div className="flex flex-col items-center text-center md:w-1/2">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={192}
                            height={192}
                            className="object-cover rounded-md"
                        />
                        <h1 className="text-2xl font-bold mt-4">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {product.description}
                        </p>
                        <p className="text-xl font-semibold mt-2">
                            ${product.price} {product.currency}
                        </p>
                    </div>

                    {/* Right: Checkout Form */}
                    <div className="md:w-1/2">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default Checkout;
