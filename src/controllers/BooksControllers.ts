import { Request, Response } from 'express';
import BooksServices from '../services/BooksServices';

import { validationResult } from "express-validator";

import ResponseError from '../utils/ResponseError';
import ErrorHandler from '../helpers/ErrorHandlerHelpers'


class BooksControllers {

    async getBooks(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }
            const { page = 1 } = req.query
            const books = await BooksServices.getBooks(Number(page))

            res.status(200).send(books);

        } catch (error: any) {

            ErrorHandler.do(error, res)
        }

    }

    async countBooks(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const books = await BooksServices.countBooks()

            res.status(200).send(books);

        } catch (error: any) {

            ErrorHandler.do(error, res)
        }

    }


    async getBookById(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const book = await BooksServices.getBookById(req.params.id)

            if (!book) {
                throw new ResponseError(404);
            }

            res.status(200).send(book);

        } catch (error: any) {

            ErrorHandler.do(error, res)
        }
    }

    async searchBooks(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }
            const { author = '', title = '', page = 1 } = req.query
            const books = await BooksServices.searchBooks({ author: String(author), title: String(title), page: Number(page) })

            if (!books) {
                throw new ResponseError(404);
            }

            res.status(200).send(books);

        } catch (error: any) {

            ErrorHandler.do(error, res)
        }
    }

    async createBook(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const book = await BooksServices.createBook(req.body)

            res.status(200).send(book);
        } catch (error: any) {

            ErrorHandler.do(error, res)
        }
    }

    async updateBookById(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const book = await BooksServices.updateBookById(req.params.id, req.body)

            if (!book) {
                throw new ResponseError(404);
            }

            res.status(200).send(book);
        } catch (error: any) {

            ErrorHandler.do(error, res)
        }
    }


    async deleteBookById(req: Request, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const book = await BooksServices.deleteBookById(req.params.id)

            if (!book) {
                throw new ResponseError(404);
            }

            res.sendStatus(200);
        } catch (error: any) {

            ErrorHandler.do(error, res)
        }
    }

    async takeBook(req: any, res: Response) {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ResponseError(400, errors.array());
            }

            const books = await BooksServices.takeBook(req.userId, req.body)

            res.status(200).send(books);

        } catch (error: any) {

            ErrorHandler.do(error, res)
        }

    }

}

export default new BooksControllers()