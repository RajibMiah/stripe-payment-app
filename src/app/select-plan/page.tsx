import { CheckIcon } from "@heroicons/react/24/solid";
const SelectPlan = () => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="flex justify-center">
          <div className="flex justify-center flex-col items-center">
            <div className="text-4xl py-2">
              <span>Choose Your Pricing Plan</span>
            </div>
            <div className="text-lg py-2 w-3/4 text-center">
              <span>
                Let's get started! Choose your Secure, Reliable and comfortable
                plan which is tailored on your needs
              </span>
            </div>
            <div className="flex justify-center items-center gap-4 py-2 px-4 border border-solid rounded-md bg-purple-100">
              <div className="border border-solid rounded-md bg-black text-white py-2 px-6">
                <span className="text-xs">Monthly</span>
              </div>
              <div>
                <span className="text-xs">Annaully</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start gap-10 p-12">
          <div>
            <div className="flex justify-center items-start flex-col border border-solid rounded-md w-72 sm:w-80 md:w-96 lg:w-[19rem] py-4 px-8">
              <div className="text-base font-semibold py-2">
                <span>Professional</span>
              </div>
              <div className="flex justify-center text-start flex-col gap-4">
                <div className="flex justify-center text-start flex-col">
                  <span className="text-xl font-semibold py-2 ">
                    $30 /month
                  </span>
                  <span className="font-medium w-full text-sm">
                    Perfect for growing business and freelancers. The
                    Professional Plan takes your prjects to the next level
                  </span>
                </div>
                <div className="flex items-center justify-center px-4">
                  <button className="w-full bg-black text-white rounded-lg p-1 text-sm ">
                    Get Started
                  </button>
                </div>
                <div>
                  <ul className="flex flex-col gap-1">
                    <li className="flex items-center gap-3 text-sm">
                      <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="text-white w-3 h-3" />
                      </div>
                      <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="text-white w-3 h-3" />
                      </div>
                      <span>Client Collaboration Excellence</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="text-white w-3 h-3" />
                      </div>
                      <span>Priority Support</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="text-white w-3 h-3" />
                      </div>
                      <span>Enhanced Productivity Tools</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="rounded-full bg-black w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="text-white w-3 h-3" />
                      </div>
                      <span>Task Automation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
