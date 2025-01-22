import PlanCard from "@components/plan-card";

const SelectPlan = () => {
  return (
    <div className="flex justify-center min-h-screen py-12 px-4">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center py-6">
          <div className="text-4xl font-semibold">
            <span>Choose Your Pricing Plan</span>
          </div>
          <div className="text-lg py-2 w-full sm:w-3/4 mx-auto">
            <span>
              Let's get started! Choose your Secure, Reliable and comfortable
              plan tailored to your needs.
            </span>
          </div>
          {/* Pricing toggle buttons */}
          <div className="flex justify-center items-center gap-4 py-4">
            <div className="border border-solid rounded-md bg-black text-white py-2 px-6 cursor-pointer">
              <span className="text-xs">Monthly</span>
            </div>
            <div className="cursor-pointer">
              <span className="text-xs">Annually</span>
            </div>
          </div>
        </div>

        {/* Plan Cards Section */}
        <div className="flex justify-center items-center sm:flex-col xl:flex-row sm:gap-5 md:gap-5 xl:gap-5">
          <div className="flex justify-center items-center">
            <PlanCard
              title="Basic"
              price="$15 /month"
              description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
              features={[
                "Advanced Analytics",
                "Client Collaboration Excellence",
                "Priority Support",
                "Enhanced Productivity Tools",
                "Task Automation",
              ]}
            />
          </div>
          <div className="flex justify-center items-center">
            <PlanCard
              title="Professional"
              price="$30 /month"
              description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
              features={[
                "Advanced Analytics",
                "Client Collaboration Excellence",
                "Priority Support",
                "Enhanced Productivity Tools",
                "Task Automation",
              ]}
            />
          </div>
          <div className="flex justify-center items-center">
            <PlanCard
              title="Business"
              price="$49 /month"
              description="Perfect for growing business and freelancers. The Professional Plan takes your projects to the next level."
              features={[
                "Advanced Analytics",
                "Client Collaboration Excellence",
                "Priority Support",
                "Enhanced Productivity Tools",
                "Task Automation",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
