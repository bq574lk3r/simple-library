import express from 'express';
import booksControllers from '../controllers/BooksControllers';
import validationHelpers from '../helpers/ValidationHelpers';

const router = express.Router();

router.use('/:id', validationHelpers.validateParamId)

router.get('/', booksControllers.getBooks)

router.get('/:id', booksControllers.getBookById)

export default router