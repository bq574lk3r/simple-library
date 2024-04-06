import express from 'express';

import booksControllers from '../controllers/BooksControllers';


const router = express.Router();

router.get('/', booksControllers.getBooks)

router.post('/', booksControllers.createBook);


export default router