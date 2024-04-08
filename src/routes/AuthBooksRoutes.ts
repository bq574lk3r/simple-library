import express from 'express';

import booksControllers from '../controllers/BooksControllers';

import validationHelpers from '../helpers/ValidationHelpers';

import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.use(authenticateToken)

router.post('/', validationHelpers.validateDataBook, booksControllers.createBook);

router.patch('/:id', validationHelpers.validateUpdatedData, booksControllers.updateBookById)

router.delete('/:id', booksControllers.deleteBookById)

export default router