import React from 'react';

const LayoutLayer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white h-full  sm:w-full sm:m-10 md:w-3/4 md:m-32 rounded-md   ">
                {children}
            </div>
        </div>
    );
};

export default LayoutLayer;
