import { body, header, param, query, checkExact } from 'express-validator';
import { IBook } from '../services/BooksServices'
import { IUser } from '../services/UsersServices'

class ValidationHelpers {
    _sanitizeBook(data: IBook) {
        const { title, author, yearPublication, pages, availability } = data
        return {
            title, author, yearPublication, pages, availability
        }
    }
    _sanitizeUser(data: IUser) {
        const { email, username, password } = data
        return {
            email, username, password 
        }
    }
    validateUpdatedData = [
        body(['title', 'author']).optional().notEmpty().isString().withMessage('string value expected'),
        body(['yearPublication', 'pages', 'availability']).optional().notEmpty().isInt().withMessage('integer value expected'),
        body().customSanitizer(this._sanitizeBook)
    ]

    validateDataBook = [
        body(['title', 'author', 'yearPublication', 'pages']).notEmpty().withMessage('all fields must be filled in:\'title\', \'author\', \'yearPublication\', \'pages\''),
        body(['title', 'author']).isString().withMessage('string value expected'),
        body(['yearPublication', 'pages']).isInt().withMessage('integer value expected'),
        body('availability').optional().isInt().withMessage('integer value expected'),
        body().customSanitizer(this._sanitizeBook)
    ]

    validateaReserveBook = [
        body('id').isUUID().withMessage('invalid id')
    ]

    validateParamId = [
        param('id').isUUID().withMessage('invalid id')
    ]

    validateQueryPage = [
        query('page').optional().isInt({ min: 1 }).withMessage('invalid page, min value is 1')
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
        ...this._userData,
        body().customSanitizer(this._sanitizeUser)
    ]

    validateLogin = [
        body('email').isEmail().withMessage('use the correct email'),
        body('password').isString().withMessage('incorrect password'),
    ]
};

export default new ValidationHelpers();