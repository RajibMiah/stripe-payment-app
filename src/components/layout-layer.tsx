import React from 'react';

const LayoutLayer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className=" bg-white w-full sm:w-full lg:w-[90%] xl:w-3/4 m-4 sm:mx-8 md:m-10 lg:m-16 xl:m-20 rounded-md ">
                {children}
            </div>
        </div>
    );
};

export default LayoutLayer;
