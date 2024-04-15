
import { Model } from 'sequelize';
import { User } from '../models/Models';
import counterIsLeft from '../utils/CounterIsLeft';

interface IUser {
    username: string,
    email: string,
    password: string,
    id?: string,
    registered?: number,
    bookId?: string
}

interface ICountedUsers {
    page: number,
    isLeft: number,
    count: number,
    rows: Model<IUser>[]
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
        })

        return user
    }

    async getUsers(page: number): Promise<ICountedUsers | null> {
        const LIMIT_USERS = 10;
        const users = await User.findAndCountAll({
            attributes: ['id', 'username'],
            offset: (LIMIT_USERS * (page - 1)),
            limit: LIMIT_USERS,
            order: [
                ['username', 'ASC'],
            ],
            raw: true,
        })

        const { count } = users

        const isLeft = counterIsLeft(count, LIMIT_USERS, page)

        return {
            page,
            isLeft,
            ...users
        }
    }

    async countUsers(): Promise<{ count: number }> {
        const count: number = await User.count()
        return { count }
    }

    async getUserById(id: string): Promise<Model<IUser> | null> {
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