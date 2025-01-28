'use client';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PlanCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    handleOnClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
    title,
    price,
    description,
    features,
    handleOnClick,
}) => {
    return (
        <div
            className="
                flex justify-center items-start flex-col
                border-2 border-purple-300 rounded-md
                w-full sm:w-[18rem] md:w-[20rem] lg:w-[19rem]
                py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 lg:px-8"
        >
            {/* Plan Title */}
            <div className="text-base font-semibold py-2">
                <span>{title}</span>
            </div>

            {/* Plan Details (Price and Description) */}
            <div className="flex justify-center text-start flex-col gap-4">
                <div className="flex justify-center text-start flex-col">
                    <span className="text-xl font-semibold py-2">{price}</span>
                    <span className="w-full text-sm">{description}</span>
                </div>

                {/* Get Started Button */}
                <div className="flex items-center justify-center px-4">
                    <button
                        onClick={handleOnClick}
                        className="w-full bg-black text-white rounded-lg p-1 text-sm"
                    >
                        Get Started
                    </button>
                </div>

                {/* Features List */}
                <div>
                    <ul className="flex flex-col gap-1">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-3 text-sm"
                            >
                                <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                                    <CheckIcon className="text-white w-3 h-3" />
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanCard;
