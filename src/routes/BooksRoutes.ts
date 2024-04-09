import express from 'express';
import booksControllers from '../controllers/BooksControllers';


const router = express.Router();

router.get('/', booksControllers.getBooks)

router.get('/count', booksControllers.countBooks)

router.get('/search', booksControllers.searchBooks)


export default router