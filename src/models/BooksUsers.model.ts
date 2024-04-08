import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Book from './Books.model'
import User from './Users.model'

const BooksUsers = sequelize.define('BooksUsers', {
    BookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },}
);

export default BooksUsers;