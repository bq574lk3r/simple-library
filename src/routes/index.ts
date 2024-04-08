import express, { Request, Response } from 'express';

import booksRoutes from './BooksRoutes';
import usersRoutes from './UsersRoutes'
import authBooksRoutes from './AuthBooksRoutes'
import authUsersRoutes from './AuthUsersRoutes'


const router = express.Router();
router.use('/books', booksRoutes);
router.use('/books', authBooksRoutes);

router.use('/settings/:id', authUsersRoutes);
router.use(usersRoutes);



export default router;


