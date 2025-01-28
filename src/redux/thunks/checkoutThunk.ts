/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const oneTimePayment = createAsyncThunk<any, any>(
    'checkout/oneTimePayment',
    async (checkoutData, { rejectWithValue, getState }) => {
        try {
            console.log('get state', getState());
            const state = getState() as { auth: { user: { token: string } } };
            const token = state.auth.user.token;

            const authToken = token || localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment/create-one-time-payment`,
                checkoutData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);
