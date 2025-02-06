/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '@redux/store';
import { signup } from '@redux/thunks/authThunk';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useSignupForm = (toggleModal: () => void) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        for (const key in formData) {
            if (!formData[key as keyof typeof formData]) {
                return alert('Please fill all fields');
            }
        }
        try {
            const res = await dispatch(signup(formData));
            if (res.meta.requestStatus === 'rejected') {
                alert('Signup failed: ' + res.payload);
            } else {
                alert('Signup successful');
                toggleModal();
            }
        } catch (error: any) {
            alert('Signup failed: ' + error.message);
        }
    };

    return { formData, handleFormChange, handleSignup };
};

export default useSignupForm;
