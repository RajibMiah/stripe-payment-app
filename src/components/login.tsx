import { useEffect, useState } from 'react';

const Login = ({ toggleModal }: any) => {
    const [formData, setFormData] = useState({
        email: '',
        passwrod: '',
    });

    const handleLogin = (e: any) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleFormChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black opacity-50 absolute inset-0"></div>
                <div className="min-w-128 bg-white p-8 rounded-lg shadow-lg z-10 min-w-124">
                    <h2 className="text-2xl mb-4 text-center p-4">Sign Up</h2>
                    <form>
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
                                name="passwrod"
                                onChange={handleFormChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="text-center ">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleLogin}
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
