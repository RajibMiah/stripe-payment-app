/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { oneTimePayment } from '@redux/thunks/checkoutThunk';
interface CheckoutState {
    loading: boolean;
    error: string | null;
    paymentSuccess: boolean;
}

const initialState: CheckoutState = {
    loading: false,
    error: null,
    paymentSuccess: false,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        // You can keep these if you need to manually dispatch them
        initiatePayment: (state) => {
            state.loading = true;
            state.error = null;
            state.paymentSuccess = false;
        },
        paymentSuccess: (state) => {
            state.loading = false;
            state.paymentSuccess = true;
        },
        paymentFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(oneTimePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.paymentSuccess = false;
            })
            .addCase(oneTimePayment.fulfilled, (state) => {
                state.loading = false;
                state.paymentSuccess = true;
            })
            .addCase(
                oneTimePayment.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { initiatePayment, paymentSuccess, paymentFailure } =
    checkoutSlice.actions;

export default checkoutSlice.reducer;
