export interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
    isLoading: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
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
