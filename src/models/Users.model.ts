import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
    },
    registered: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }]
}
);

export default User;