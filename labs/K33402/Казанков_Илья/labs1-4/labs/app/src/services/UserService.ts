import { User } from '../models/user.js'
import sequelize from '../index.js'


const UserRepository = sequelize.getRepository(User);

export class UserService {
    public async findByEmail(email: string): Promise<User | null> {
        return await UserRepository.findOne({ where: { email } })
    }

    public async createUser(data: Partial<User>): Promise<User> {
        return await UserRepository.create(data)
    }
}
