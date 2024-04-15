import express from 'express';
import booksControllers from '../controllers/BooksControllers';
import validationHelpers from '../helpers/ValidationHelpers';


const router = express.Router();

router.get('/', validationHelpers.validateQueryPage, booksControllers.getBooks)

router.get('/count', booksControllers.countBooks)

router.get('/search', validationHelpers.validateQueryPage, booksControllers.searchBooks)


export default router