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
        <div>pricing card</div>
      </div>
    </div>
  );
};

export default SelectPlan;
