import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
    // Проверяем, есть ли пользователь и его административный статус в req.user
    const user = (req as any).user;

    if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' }); // Теперь TypeScript понимает, что мы возвращаем Response
    }

    next(); // Если пользователь администратор, передаем управление следующему middleware
};
