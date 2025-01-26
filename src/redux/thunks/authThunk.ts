import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

// Signup thunk
export const signup = createAsyncThunk<AuthResponse, AuthPayload>(
    'auth/signup',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/signup', payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Login thunk
export const login = createAsyncThunk<AuthResponse, AuthPayload>(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login', payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
