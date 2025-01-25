
export interface UserJwtToken {
    id: string;
    email: string;
    username: string;
    iat: number; // Issued at
    exp: number; // Expiration time
    originalPath: string; // Original path
}
