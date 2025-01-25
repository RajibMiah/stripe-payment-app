import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload & { email?: string; originalPath?: string };
}


export interface CustomError extends Error {
    status?: number;
    message: string;
}