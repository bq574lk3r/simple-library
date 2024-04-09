import express, { Request, Response } from 'express';

import booksRoutes from './BooksRoutes';
import bookRoutes from './BookRoutes';
import authBookRoutes from './AuthBookRoutes'

import userRegLogRoutes from './UserRegLogRoutes'
import usersRoutes from './UsersRoutes'
import authUsersRoutes from './AuthUsersRoutes'


const router = express.Router();
router.use('/books', booksRoutes);
router.use('/book', bookRoutes);
router.use('/book', authBookRoutes);

router.use('/settings', authUsersRoutes);
router.use('/people', usersRoutes );
router.use('/', userRegLogRoutes);



export default router;


