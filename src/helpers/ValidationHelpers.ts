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
    validateParamId = [
        param('id').notEmpty().isUUID().withMessage('invalid id')
    ]
};

export default new ValidationHelpers();