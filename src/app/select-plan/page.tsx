/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PlanCard from '@components/plan-card';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { oneTimePayment } from '@redux/thunks/checkoutThunk';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const SelectPlan = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Handles redirecting to Stripe checkout
    const handleStripeRedirect = async (id: string) => {
        console.log('Redirecting to checkout with session ID:', id);
        const stripe = await stripePromise;

        const { error } = await stripe.redirectToCheckout({
            sessionId: id,
        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
            alert(
                'There was an error with the payment process. Please try again.'
            );
        }
    };

    // Handles payment submission
    const onTimePayment = async (planId: string) => {
        try {
            const res = await dispatch(oneTimePayment({ planId }));

            if (res.meta.requestStatus === 'rejected') {
                alert('Payment failed: ' + res.payload);
            } else {
                const { id } = res.payload;
                handleStripeRedirect(id);
            }
        } catch (err: any) {
            console.error('Payment error:', err);
            alert('Payment failed: ' + err.message);
        }
    };

    return (
        <div className="flex justify-center h-full py-20 gap-10">
            <div className="w-full max-w-7xl">
                {/* Header Section */}
                <div className="text-center px-4 py-6">
                    {/* Title */}
                    <h2 className="text-4xl font-semibold">
                        Choose Your Pricing Plan
                    </h2>
                    {/* Subtitle */}
                    <p className="text-lg py-2 w-full sm:w-3/4 mx-auto">
                        Let&apos;s get started! Choose your Secure, Reliable,
                        and Comfortable plan tailored to your needs.
                    </p>
                    {/* Pricing Toggle Buttons */}
                    <div className="flex justify-center items-center gap-4 py-4">
                        {/* Monthly Button */}
                        <button className="border border-solid rounded-md bg-black text-white py-2 px-6 cursor-pointer">
                            Monthly
                        </button>
                        {/* Annually Button */}
                        <button className="text-black cursor-pointer">
                            Annually
                        </button>
                    </div>
                </div>

                {/* Plan Cards Section */}
                <div className="flex flex-col gap-4 items-center sm:gap-5 md:gap-6 lg:gap-7 xl:flex-row lg:justify-around xl:justify-around xl:gap-8">
                    {/* Basic Plan Card */}
                    <div className="flex justify-center items-center">
                        <PlanCard
                            title="Basic"
                            price="$15 /month"
                            handleOnClick={() => onTimePayment('basic-plan')}
                            description="Perfect for growing business and freelancers."
                            features={[
                                'Advanced Analytics',
                                'Client Collaboration Excellence',
                                'Priority Support',
                                'Enhanced Productivity Tools',
                                'Task Automation',
                            ]}
                        />
                    </div>
                    {/* Professional Plan Card */}
                    <div className="flex justify-center items-center">
                        <PlanCard
                            title="Professional"
                            price="$30 /month"
                            handleOnClick={() =>
                                onTimePayment('professional-plan')
                            }
                            description="Perfect for growing businesses and freelancers."
                            features={[
                                'Advanced Analytics',
                                'Client Collaboration Excellence',
                                'Priority Support',
                                'Enhanced Productivity Tools',
                                'Task Automation',
                            ]}
                        />
                    </div>
                    {/* Business Plan Card */}
                    <div className="flex justify-center items-center">
                        <PlanCard
                            title="Free Trial"
                            price="$49 /month"
                            handleOnClick={() => onTimePayment('free-trial')}
                            description="Perfect for growing businesses and freelancers."
                            features={[
                                'Advanced Analytics',
                                'Client Collaboration Excellence',
                                'Priority Support',
                                'Enhanced Productivity Tools',
                                'Task Automation',
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectPlan;
