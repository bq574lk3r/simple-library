import express from 'express';
import usersControllers from '../controllers/UsersControllers';
import validationHelpers from '../helpers/ValidationHelpers';

const router = express.Router();

router.get('/', validationHelpers.validateQueryPage, usersControllers.getUsers);

router.get('/count', usersControllers.countUsers);

router.get('/:id', validationHelpers.validateParamId, usersControllers.getUserById);

export default router