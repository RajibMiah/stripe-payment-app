import React from "react";

const LayoutLayer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative bg-hero-pattern bg-cover bg-center h-full w-full">
      <div className="relative lg:absolute top-[8%] left-[8%] right-[8%] bottom-[8%] rounded-md bg-white sm:w-full sm:h-auto lg:w-3/4 xl:w-2/3 mx-auto">
        {children}
      </div>
    </div>
  );
};

export default LayoutLayer;
