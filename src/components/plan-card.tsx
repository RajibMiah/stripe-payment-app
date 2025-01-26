import { CheckIcon } from '@heroicons/react/24/solid';

const PlanCard = ({ title, price, description, features }: any) => {
    return (
        <div className="flex justify-center items-start flex-col border-2 border-purple-300 rounded-md w-72 sm:w-80 md:w-96 lg:w-[19rem] py-4 px-8">
            <div className="text-base font-semibold py-2">
                <span>{title}</span>
            </div>
            <div className="flex justify-center text-start flex-col gap-4">
                <div className="flex justify-center text-start flex-col">
                    <span className="text-xl font-semibold py-2">{price}</span>
                    <span className=" w-full text-sm">{description}</span>
                </div>
                <div className="flex items-center justify-center px-4">
                    <button className="w-full bg-black text-white rounded-lg p-1 text-sm">
                        Get Started
                    </button>
                </div>
                <div>
                    <ul className="flex flex-col gap-1">
                        {features.map((feature: string, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                                        <CheckIcon className="text-white w-3 h-3" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanCard;
