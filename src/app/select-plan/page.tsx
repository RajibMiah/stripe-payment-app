'use client';

import PlanCard from '@components/plan-card';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { oneTimePayment } from '@redux/thunks/checkoutThunk';

const SelectPlan = () => {
    const dispatch = useDispatch<AppDispatch>();

    const onTimePayment = async () => {
        try {
            const res = await dispatch(oneTimePayment({}));
            if (res.meta.requestStatus === 'rejected') {
                alert('Payment failed: ' + res.payload);
            } else {
                console.log('Payment successfull', res);
            }
        } catch (err) {
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
                            handleOnClick={onTimePayment}
                            description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
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
                            handleOnClick={onTimePayment}
                            description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
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
                            handleOnClick={onTimePayment}
                            description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
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
