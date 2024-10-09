import Queue from 'bull';
import { User } from './models/user.js'; // Импорт модели пользователя

// Создаем очередь
const registerQueue = new Queue('registerQueue', {
    redis: { port: 6379, host: 'localhost' }, // Настройки подключения Redis
});

// Процесс обработки регистрации
registerQueue.process(async (job, done) => {
    try {
        const { firstName, lastName, email, password, isAdmin } = job.data;
        
        // Создаем нового пользователя
        const user = await User.create({ firstName, lastName, email, password, isAdmin });
        
        done(null, user); // Завершаем задачу
    } catch (error) {
        done(new Error('Failed to register user'));
    }
});

export { registerQueue };
