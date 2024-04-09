
import { Model, Op } from 'sequelize';
import { Book, BooksUsers } from '../models/Models';
import sequelize from '../config/db'

import ResponseError from '../utils/ResponseError';

interface IBook {
    id?: string,
    title: string,
    author: string,
    yearPublication: number,
    pages: number,
    availability?: number
}

export class BooksServices {

    async getBooks(): Promise<Model<IBook>[]> {

        const books: Model<IBook>[] = await Book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            raw: true
        })

        return books;
    }

    async countBooks(): Promise<{ count: number }> {
        const count: number = await Book.count()

        return { count };
    }

    async getBookById(id: string): Promise<Model<IBook> | null> {
        const bookById = await Book.findByPk(id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                raw: true
            })

        return bookById;
    }

    async searchBooks(dataBook: { author: any, title: any }): Promise<any | void> {
        const { author, title } = dataBook
        const books: Model<IBook>[] = await Book.findAll({
            where: {
                title: {
                    [Op.iLike]: '%' + title + '%'
                },
                author: {
                    [Op.iLike]: '%' + author + '%'
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            raw: true
        })

        return books
    }

    async createBook(dataBook: IBook): Promise<IBook | void> {
        const { title, author, yearPublication, pages, availability } = dataBook;

        const book = await Book.create({
            title, author, yearPublication, pages, availability
        });

        const { createdAt, updatedAt, ...bookData } = book.dataValues;

        return bookData;
    }

    async updateBookById(id: string, updateData: IBook): Promise<IBook | number> {
        const { title, author, yearPublication, pages, availability } = updateData;

        const updatedBook = await Book.update({ title, author, yearPublication, pages, availability },
            {
                where: { id },
                returning: true,
            });

        const [count] = updatedBook;

        return updatedBook[1][0]?.dataValues || count

    }

    async deleteBookById(id: string): Promise<number> {
        const isDeleted = await Book.destroy({ where: { id } })

        return isDeleted

    }

    async takeBook(userId: string, bookData: IBook): Promise<any | null> {
        const { id: bookId } = bookData

        const t = await sequelize.transaction();

        try {
            const book: any = await Book.decrement('availability',
                {
                    by: 1,
                    where: { id: bookId },
                    transaction: t
                })

            const { availability } = book.flat(2)[0]

            if (availability < 0) throw new ResponseError(406)

            let userBook = await BooksUsers.create(
                { UserId: userId, BookId: bookId }, {
                transaction: t
            })

            await t.commit();
            return userBook;
        } catch (error) {
            await t.rollback();
            throw error
        }

    }
}

export default new BooksServices()