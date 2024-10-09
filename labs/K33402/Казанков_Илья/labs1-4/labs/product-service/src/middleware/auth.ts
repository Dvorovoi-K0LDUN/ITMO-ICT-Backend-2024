import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Сохраняем информацию о пользователе в req.user для дальнейшего использования
        (req as any).user = decoded;
        next();
    });
};
