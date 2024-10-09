import { Product } from '../models/product';
import { Op } from 'sequelize';

export class ProductService {

    public async createProduct(data: { name: string, category: string, price: number, stock: number, discount: boolean }): Promise<Product> {
        return Product.create(data);
    }

    public async findProductById(id: number): Promise<Product | null> {
        return Product.findByPk(id);
    }

    public async updateProduct(id: number, data: { name: string, category: string, price: number, stock: number, discount: boolean }): Promise<Product | null> {
        const product = await Product.findByPk(id);
        if (product) {
            await product.update(data);
            return product;
        }
        return null;
    }

    public async searchProducts(query: string): Promise<Product[]> {
        return Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { category: { [Op.like]: `%${query}%` } }
                ]
            }
        });
    }
}
