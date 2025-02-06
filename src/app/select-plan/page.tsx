/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PlanCard from '@components/plan-card';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';

import { setStripePriceId } from '@redux/slices/checkoutSlice';
import { plansData } from 'utlities/plans-data';

const SelectPlan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleCheckout = async (price_id: string) => {
        console.log('stripe price id', price_id);
        dispatch(setStripePriceId(price_id));
        router.push('/checkout');
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

                <div className="flex flex-col gap-6 items-center sm:gap-7 md:gap-8 lg:flex-row lg:justify-center xl:gap-4 2xl:gap-10">
                    {plansData.map((plan) => (
                        <PlanCard
                            key={plan.planId}
                            title={plan.title}
                            price={plan.price}
                            description={plan.description}
                            features={plan.features}
                            handleOnClick={() =>
                                handleCheckout(plan.stripe_price_id)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectPlan;
