
import { Model, Op, Transaction } from 'sequelize';
import { Book, BooksUsers } from '../models/Models';
import sequelize from '../config/db'

import ResponseError from '../utils/ResponseError';
import counterIsLeft from '../utils/CounterIsLeft';


export interface IBook {
    id?: string,
    title: string,
    author: string,
    yearPublication: number,
    pages: number,
    availability?: number
}

interface IModelBook extends IBook, Model { }

interface ICountedBooks {
    page: number,
    isLeft: number,
    count: number,
    rows: Model<IBook>[]
}

interface ITakeBooks extends Model {
    id: string,
    UserId: string,
    BookId: string,
    updatedAt: string,
    createdAt: string
}

export class BooksServices {

    async getBooks(page: number): Promise<ICountedBooks> {
        const LIMIT_BOOKS = 15;
        const books = await Book.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            offset: (LIMIT_BOOKS * (page - 1)),
            limit: LIMIT_BOOKS,
            order: [
                ['title', 'ASC'],
            ],
            raw: true
        })

        const { count } = books

        const isLeft = counterIsLeft(count, LIMIT_BOOKS, page)

        return {
            page,
            isLeft,
            ...books
        };
    }

    async countBooks(): Promise<{ count: number }> {
        const count: number = await Book.count()

        return { count };
    }

    async getBookById(id: string): Promise<Model<IBook> | null> {
        return await Book.findByPk(id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true
            })
    }

    async searchBooks(dataBook: { author: string, title: string, page: number }): Promise<ICountedBooks | void> {
        const { author, title, page } = dataBook
        const LIMIT_BOOKS = 15;

        const books = await Book.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: '%' + title + '%'
                },
                author: {
                    [Op.iLike]: '%' + author + '%'
                }
            },
            offset: (LIMIT_BOOKS * (page - 1)),
            limit: LIMIT_BOOKS,
            order: [
                ['title', 'ASC'],
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            raw: true
        })

        const { count } = books

        const isLeft = counterIsLeft(count, LIMIT_BOOKS, page)

        return {
            page,
            isLeft,
            ...books
        };
    }

    async createBook(dataBook: IBook): Promise<IBook | void> {
        const book = await Book.create({
            ...dataBook
        });

        const { createdAt, updatedAt, ...bookData } = book.dataValues;

        return bookData;
    }

    async updateBookById(id: string, updateData: IBook): Promise<IBook | number> {
        const [count, updatedBook] = (await Book.update({ ...updateData },
            {
                where: { id },
                returning: true,
            })).flat() as [number, IBook];


        return updatedBook || count;

    }

    async deleteBookById(id: string): Promise<number> {
        const isDeleted = await Book.destroy({ where: { id } })

        return isDeleted

    }

    async takeBook(userId: string, bookData: IBook): Promise<ITakeBooks | null> {
        const { id: bookId } = bookData

        const t = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });

        try {
            const [book] = (await Book.decrement('availability',
                {
                    by: 1,
                    where: { id: bookId },
                    transaction: t
                })).flat(2) as [IModelBook]


            const { availability } = book

            if (availability && availability < 0) throw new ResponseError(406)

            const userBook = await BooksUsers.create(
                {
                    UserId: userId,
                    BookId: bookId
                },
                {
                    transaction: t
                }) as ITakeBooks

            await t.commit();
            return userBook;
        } catch (error) {
            await t.rollback();
            throw error
        }

    }
}

export default new BooksServices()