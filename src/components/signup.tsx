import useSignupForm from '@hooks/useSignupForm';

interface SignupProps {
    toggleModal: () => void;
}
const Signup: React.FC<SignupProps> = ({ toggleModal }) => {
    const { handleFormChange, handleSignup } = useSignupForm(toggleModal);
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 absolute inset-0"></div>
                <div className="min-w-128 bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-2xl mb-4 text-center p-4">Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <div className="flex mb-4 gap-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleFormChange}
                                    className="w-50 px-3 py-3 border rounded"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleFormChange}
                                    className="w-50 px-3 py-3 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password" // Fixed typo here (passwrod -> password)
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-purple-500 text-white px-4 py-2 rounded"
                            >
                                Sign Up
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

export default Signup;
