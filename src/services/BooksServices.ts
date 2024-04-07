
import { Model } from 'sequelize';
import { Book } from '../models/Models';

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

}

export default new BooksServices()