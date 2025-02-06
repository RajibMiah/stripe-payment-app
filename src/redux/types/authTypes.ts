// Removed duplicate AuthState interface

export interface User {
    id: string;
    name: string;
    email: string;
}
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}

export interface AuthLoginPayload {
    email: string;
    password: string;
}

export interface AuthSignUpPayload {
    name: string;
    email: string;
    password: string;
}
