import express from 'express';

import usersControllers from '../controllers/UsersControllers';

const router = express.Router();

router.post('/register', usersControllers.createUser);

router.post('/login', usersControllers.loginUser);

router.get('/people', usersControllers.getUsers);

router.get('/people/:id', usersControllers.getUserById);

export default router