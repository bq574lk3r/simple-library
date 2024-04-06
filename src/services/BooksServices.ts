
import { Model } from 'sequelize';
import { Book } from '../models/Models';

import ResponseError from '../utils/ResponseError';
import { Sequelize } from 'sequelize';

interface IBook {
    id?: string,
    title: string,
    author: string,
    yearPublication: number,
    pages: number,
    availability?: number
}

// interface IReturnBook extends IBook {
//     id: string,
// }

export class BooksServices {

    async getBooks(): Promise<Model[]> {

        const books: Model[] = await Book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            raw: true
        })
        console.log(books)
        return books;
    }

    async createBook(dataBook: IBook): Promise<IBook | void> {
        const { title, author, yearPublication, pages, availability } = dataBook;

        const book = await Book.create({
            title, author, yearPublication, pages, availability
        });

        const { createdAt, updatedAt, ...bookData } = book.dataValues;

        return bookData;
    }


}

export default new BooksServices()