import express from 'express';
import booksControllers from '../controllers/BooksControllers';
import validationHelpers from '../helpers/ValidationHelpers';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.use(authenticateToken)

router.post('/reserve', validationHelpers.validateaReserveBook, booksControllers.takeBook)

router.post('/add', validationHelpers.validateDataBook, booksControllers.createBook);

router.patch('/:id', validationHelpers.validateParamId, validationHelpers.validateUpdatedData, booksControllers.updateBookById)

router.delete('/:id', validationHelpers.validateParamId, booksControllers.deleteBookById)

export default router