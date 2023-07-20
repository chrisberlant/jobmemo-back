import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: "postgres",
    define: {
        timestamps: false,
        underscored: true,
    },
    logging: console.log
});

export default sequelize;