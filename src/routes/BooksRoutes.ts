import express from 'express';

import booksControllers from '../controllers/BooksControllers';


const router = express.Router();

router.get('/', booksControllers.getBooks)

router.get('/:id', booksControllers.getBookById)

router.post('/', booksControllers.createBook);

router.put('/:id', booksControllers.updateBookById)

router.delete('/:id', booksControllers.deleteBookById)

export default router