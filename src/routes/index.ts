import express, { Request, Response } from 'express';

import booksRoutes from './BooksRoutes';


const router = express.Router();

router.use('/books', booksRoutes);

export default router;


