/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '@redux/store';
import { login } from '@redux/thunks/authThunk';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useLoginForm = (toggleModal: () => void) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        for (const key in formData) {
            if (!formData[key as keyof typeof formData]) {
                return alert('Please fill all fields');
            }
        }
        try {
            const res = await dispatch(login(formData));
            if (res.meta.requestStatus === 'rejected') {
                alert('Login failed: ' + res.payload);
            } else {
                alert('Login successful');
                toggleModal();
            }
        } catch (error: any) {
            alert('Login failed: ' + error.message);
        }
    };

    return { formData, handleFormChange, handleLogin };
};

export default useLoginForm;
