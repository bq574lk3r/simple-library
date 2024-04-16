import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    String(process.env.DATABASE),
    String(process.env.DB_USER),
    String(process.env.PASSWORD),
    {
        host: process.env.HOST,
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;