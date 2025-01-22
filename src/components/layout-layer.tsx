import React from "react";

const LayoutLayer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" relative bg-hero-pattern bg-cover bg-center h-full w-full ">
      <div className="absolute top-8 left-12 right-12 bottom-8 rounded-md bg-white">
        {children}
      </div>
    </div>
  );
};

export default LayoutLayer;
