import express from 'express';
import booksControllers from '../controllers/BooksControllers';
import validationHelpers from '../helpers/ValidationHelpers';

const router = express.Router();

router.get('/', booksControllers.getBooks)

router.get('/:id',validationHelpers.validateParamId, booksControllers.getBookById)

export default router