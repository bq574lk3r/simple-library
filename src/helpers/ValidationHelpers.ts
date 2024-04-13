import { body, param } from 'express-validator';

class ValidationHelpers {
    validateUpdatedData = [
        body(['title', 'author']).optional().notEmpty().isString().withMessage('string value expected'),
        body(['yearPublication', 'pages', 'availability']).optional().notEmpty().isInt().withMessage('integer value expected'),
    ]

    validateDataBook = [
        body(['title', 'author', 'yearPublication', 'pages']).notEmpty().withMessage('all fields must be filled in:\'title\', \'author\', \'yearPublication\', \'pages\''),
        body(['title', 'author']).isString().withMessage('string value expected'),
        body(['yearPublication', 'pages']).isInt().withMessage('integer value expected'),
        body('availability').optional().isInt().withMessage('integer value expected'),
    ]

    _userData = [
        body('email').optional().isEmail().withMessage('use the correct email'),
        body('username').optional().isLength({ min: 2 }).isString().withMessage('use the correct username'),
        body('password').optional().isLength({ min: 6, max: 16 }).withMessage('min length 6'),
    ]

    validateDataUser = [
        body(['username', 'email', 'password']).notEmpty().withMessage('all fields must be filled'),
        ...this._userData
    ]

    validateUpdatedUser = [
        ...this._userData
    ]

    validateLogin = [
        body('email').isEmail().withMessage('use the correct email'),
        body('password').isString().withMessage('incorrect password'),
    ]

    validateParamId = [
        param('id').notEmpty().isUUID().withMessage('invalid id')
    ]
};

export default new ValidationHelpers();