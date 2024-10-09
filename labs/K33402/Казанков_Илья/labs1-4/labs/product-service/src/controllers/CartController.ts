import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

const cartService = new CartService();

export class CartController {
    // Метод для добавления товара в корзину
    public async addToCart(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user.id; // Получаем ID пользователя из токена
        const { productId, quantity } = req.body;

        try {
            const cartItem = await cartService.addToCart(userId, productId, quantity);
            res.status(201).json(cartItem);
        } catch (error) {
            // Проверяем тип ошибки и обрабатываем её
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    // Метод для получения товаров в корзине
    public async getCart(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user.id; // Получаем ID пользователя из токена
        try {
            const cart = await cartService.getCart(userId);
            res.json(cart);
        } catch (error) {
            // Проверяем тип ошибки и обрабатываем её
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }
}
