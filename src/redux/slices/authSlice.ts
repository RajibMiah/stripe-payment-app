/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/authTypes';
import { login, signup } from 'redux/thunks/authThunk';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(login.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state: any, action: PayloadAction<AuthState>) => {
                    state.isAuthenticated = true;
                    state.user = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(login.rejected, (state: any) => {
                state.isLoading = false;
            });

        builder
            .addCase(signup.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(
                signup.fulfilled,
                (state: any, action: PayloadAction<AuthState>) => {
                    state.isAuthenticated = true;
                    state.user = action.payload;
                    state.isLoading = false;
                }
            )
            .addCase(signup.rejected, (state: AuthState) => {
                state.isLoading = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
