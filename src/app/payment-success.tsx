import Link from 'next/link';

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
                <p className="mb-8">Thank you for your purchase.</p>
                <Link href="/">
                    <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Go to Home
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
