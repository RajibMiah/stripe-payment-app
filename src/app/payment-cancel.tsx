import Link from 'next/link';
import React from 'react';

const PaymentCancel: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-gray-700 mb-6">
                    Your payment has been cancelled. If you have any questions,
                    please contact support.
                </p>
                <Link href="/" className="text-blue-500 hover:underline">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;
