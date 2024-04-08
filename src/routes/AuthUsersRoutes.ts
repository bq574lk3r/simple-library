import express from 'express';

import usersControllers from '../controllers/UsersControllers';

import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.patch('/', authenticateToken, usersControllers.updateUserById);

router.delete('/', authenticateToken, usersControllers.deleteUserById);

export default router