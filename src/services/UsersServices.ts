
import { Model } from 'sequelize';
import { User } from '../models/Models';

interface IUser {
    username: string,
    email: string,
    password: string,
    id?: string,
    registered?: number,
    bookId?: string
}

export class BooksServices {
    async createUser(dataUser: IUser): Promise<Model<IUser> | void> {
        const { username, email, password } = dataUser;
        
        const newUser = await User.create({
            username, email, password
        });

        return newUser
    }

    async getUserByEmail(email: string): Promise<any | null> {
        const user = await User.findOne({
            where: {
                email
            },
            raw: true,
        })

        return user
    }

    async getUsers(): Promise<any | null> {
        const users = await User.findAll({
            attributes: ['id', 'username'],
            raw: true,
        })

        return users
    }

    async countUsers(): Promise<{ count: number }> {
        const count: number = await User.count()

        return { count }
    }

    async getUserById(id: string): Promise<any | null> {
        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'registered'],
            raw: true,
        })
        return user
    }

    async updateUserById(id: string, userData: IUser): Promise<IUser | number> {
        const { username, email, password } = userData
        const updatedUser = await User.update({ username, email, password },
            {
                where: { id },

                returning: true,

            });

        const [count] = updatedUser;
        const { password: _, ...user } = updatedUser[1][0]?.dataValues
        return user || count
    }

    async deleteUserById(id: string): Promise<number> {

        const isDeleted = await User.destroy({ where: { id } });

        return isDeleted;
    }

}

export default new BooksServices()