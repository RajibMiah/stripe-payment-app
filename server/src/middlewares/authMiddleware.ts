/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/global';
import { UserJwtToken } from '../types/user';

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const splitedToken = token.split(' ')[1];
        const decoded = jwt.verify(
            splitedToken,
            process.env.JWT_SECRET as string
        );
        req.user = decoded as UserJwtToken;
        next();
    } catch (err) {
        next('Authorization denied');
        console.error('Something went wrong', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
