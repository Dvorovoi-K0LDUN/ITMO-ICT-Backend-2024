import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { Product } from './models/product';
import { User } from './models/user';
import { Cart } from './models/Cart'; // Импортируем модель Cart

import { ProductController } from './controllers/ProductController';
import { authMiddleware } from './middleware/auth';
import { adminMiddleware } from './middleware/admin';
import { CartController } from './controllers/CartController'; // Контроллер корзины

const app = express();
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    models: [Product, User, Cart] // Добавляем модель Cart
});

app.use(bodyParser.json());

const productController = new ProductController();
const cartController = new CartController();

app.post('/products', authMiddleware, adminMiddleware, productController.create);
app.put('/products/:id', authMiddleware, adminMiddleware, productController.update);
app.get('/products/search', productController.search);

// Маршрут для добавления товара в корзину
app.post('/cart', authMiddleware, cartController.addToCart);

// Маршрут для получения корзины пользователя
app.get('/cart', authMiddleware, cartController.getCart);

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
}).then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(3001, () => {
        console.log('Product service is running on port 3001');
    });
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

