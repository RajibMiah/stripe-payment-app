export interface UserJwtToken {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    iat: number; // Issued at
    exp: number; // Expiration time
    originalPath: string; // Original path
}
