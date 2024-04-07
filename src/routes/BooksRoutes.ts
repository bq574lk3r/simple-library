import express from 'express';

import booksControllers from '../controllers/BooksControllers';

import validationHelpers from '../helpers/ValidationHelpers';


const router = express.Router();

router.use('/:id', validationHelpers.validateParamId)

router.get('/', booksControllers.getBooks)

router.get('/:id', booksControllers.getBookById)

router.post('/', validationHelpers.validateDataBook, booksControllers.createBook);

router.patch('/:id', validationHelpers.validateUpdatedData, booksControllers.updateBookById)

router.delete('/:id', booksControllers.deleteBookById)

export default router