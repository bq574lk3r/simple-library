import express from 'express';
import usersControllers from '../controllers/UsersControllers';
import authenticateToken from '../middleware/authenticateToken';
import validationHelpers from '../helpers/ValidationHelpers';

const router = express.Router();

router.use(authenticateToken)

router.patch('/', validationHelpers.validateUpdatedUser, usersControllers.updateUserById);

router.delete('/', usersControllers.deleteUserById );

export default router