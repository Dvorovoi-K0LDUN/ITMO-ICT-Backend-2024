import { Cart } from '../models/Cart';
import { Product } from '../models/product';

export class CartService {
    // Метод для добавления товара в корзину
    public async addToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
        // Найти товар по ID
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Проверить, существует ли уже этот товар в корзине пользователя
        const existingCartItem = await Cart.findOne({ where: { userId, productId } });
        
        if (existingCartItem) {
            // Обновить количество, если товар уже в корзине
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return existingCartItem;
        } else {
            // Добавить новый товар в корзину
            const cartItem = await Cart.create({ userId, productId, quantity });
            return cartItem;
        }
    }

    // Метод для получения корзины пользователя
    public async getCart(userId: number): Promise<Cart[]> {
        return await Cart.findAll({ where: { userId }, include: [Product] });
    }
}
