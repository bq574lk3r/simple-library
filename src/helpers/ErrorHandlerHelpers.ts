
import { Response } from 'express';
import ResponseError from '../utils/ResponseError';

class ErrorHandler {
    do(error: any, res: Response) {
        try {
            const { code } = error;

            if (code) return res.status(code).json(error)


            console.error(error)
            throw new Error('Is there something wrong')

        } catch (error) {
            res.status(500).json(new ResponseError(500));
        }

    }
}

export default new ErrorHandler();