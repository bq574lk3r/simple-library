import { Request, Response } from 'express';
import usersServices from '../services/UsersServices';

import ResponseError from '../utils/ResponseError';
import ErrorHandler from '../helpers/ErrorHandlerHelpers'

import passCrypt from '../utils/PasswordCrypt'

const SECRET_KEY = String(process.env.SECRET_KEY);
import jwt from 'jsonwebtoken';




class UsersControllers {
    async createUser(req: Request, res: Response) {
        try {
            const dataUser = req.body;

            dataUser.password = passCrypt.createHash(dataUser.password)

            const user = await usersServices.createUser(req.body)

            res.status(200).send(user);

        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userData = await usersServices.getUserByEmail(email);

            if (!userData) throw new ResponseError(400, "Invalid email address or password");

            const { id, password: hashPassword } = userData;

            if (!passCrypt.validatePassword(password, hashPassword)) throw new ResponseError(400, "Invalid email address or password");

            const token = jwt.sign({ userId: id }, SECRET_KEY, { expiresIn: "30d" });

            res.status(200).send({ token })

        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

    async getUsers(req: Request, res: Response) {
        try {

            const users = await usersServices.getUsers()

            res.status(200).send(users);

        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

    async getUserById(req: Request, res: Response) {
        try {

            const user = await usersServices.getUserById(req.params.id)

            if (!user) throw new ResponseError(404);

            res.status(200).send(user);

        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

    async updateUserById(req: Request, res: Response) {
        try {
            const dataUser = req.body;

            dataUser.password && (dataUser.password = passCrypt.createHash(dataUser.password))

            const user = await usersServices.updateUserById(req.params.id, dataUser);

            if (!user) throw new ResponseError(404);

            res.status(200).send(user);

        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

    async deleteUserById(req: Request, res: Response) {
        try {

            const isDeleted = await usersServices.deleteUserById(req.params.id);

            if (!isDeleted) throw new ResponseError(404);

            res.sendStatus(200);
        } catch (error) {

            ErrorHandler.do(error, res);

        }

    }

}

export default new UsersControllers()