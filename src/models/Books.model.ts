import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        unique: false
    },
    author: {
        type: DataTypes.STRING,
    },
    yearPublication: {
        type: DataTypes.INTEGER,
    },
    pages: {
        type: DataTypes.INTEGER,
    },
    availability: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }
    }
}, {
    indexes: [
        {
            fields: ['title']
        },
        {
            fields: ['author']
        }]
});

export default Book