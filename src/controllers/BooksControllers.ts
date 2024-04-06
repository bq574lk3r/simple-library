import { Request, Response } from 'express';
import BooksServices from '../services/BooksServices';
import ResponseError from '../utils/ResponseError';


class BooksControllers {

    async getBooks(req: Request, res: Response) {
        try {

            const books = await BooksServices.getBooks()

            res.status(200).send(books);

        } catch (error) {
            console.log(error)
        }

    }

    async createBook(req: Request, res: Response) {
        try {
            const dataBook = req.body;

            const book = await BooksServices.createBook({ ...dataBook })

            res.status(200).send(book);
        } catch (error: any) {
            console.log(error)
        }
    }

}

export default new BooksControllers()