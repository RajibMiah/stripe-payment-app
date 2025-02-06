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
                flex flex-col items-start border-2 border-purple-300 rounded-md
                w-full sm:w-[18rem] md:w-[20rem] lg:w-[19rem] p-6 gap-4 bg-white shadow-md"
        >
            {/* Plan Title */}
            <h3 className="text-lg font-semibold">{title}</h3>

            {/* Plan Details */}
            <div className="flex flex-col">
                <span className="text-2xl font-bold py-1">{price}</span>
                <p className="text-sm text-gray-700">{description}</p>
            </div>

            {/* Get Started Button */}
            <button
                onClick={handleOnClick}
                className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium
                           transition-all duration-300 hover:bg-purple-700"
                aria-label={`Subscribe to ${title}`}
            >
                Get Started
            </button>

            {/* Features List */}
            <ul className="flex flex-col gap-2 mt-2">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <div className="rounded-full bg-black w-5 h-5 flex items-center justify-center">
                            <CheckIcon className="text-white w-4 h-4" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlanCard;
