import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
    // Метод для создания продукта
    public async create(req: Request, res: Response): Promise<void> {
        const { name, category, price, stock, discount } = req.body;
        try {
            const product = await productService.createProduct({ name, category, price, stock, discount });
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    // Метод для обновления продукта
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, category, price, stock, discount } = req.body;
        try {
            const product = await productService.updateProduct(Number(id), { name, category, price, stock, discount });
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    // Метод для поиска продуктов по ключевому слову
    public async search(req: Request, res: Response): Promise<void> {
        const { query } = req.query;
        try {
            const products = await productService.searchProducts(query as string);
            res.json(products);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }
}
