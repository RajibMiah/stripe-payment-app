/* eslint-disable @typescript-eslint/no-explicit-any */

import useLoginForm from '@hooks/useLoginForm';

const Login: React.FC<any> = ({ toggleModal }) => {
    const { formData, handleFormChange, handleLogin } =
        useLoginForm(toggleModal);

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 absolute inset-0"></div>
                <div className="min-w-128 bg-white p-8 rounded-lg shadow-lg z-10 min-w-124">
                    <h2 className="text-2xl mb-4 text-center p-4">Login</h2>{' '}
                    {/* Updated the heading to match the purpose */}
                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border rounded"
                                value={formData.email} // Controlled input
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password" // Fixed typo here
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border rounded"
                                value={formData.password} // Controlled input
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-purple-500 text-white px-4 py-2 rounded"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
