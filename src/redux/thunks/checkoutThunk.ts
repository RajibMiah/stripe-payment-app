/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const oneTimePayment = createAsyncThunk<any, any>(
    'checkout/oneTimePayment',
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment/create-one-time-payment`,
                checkoutData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);
