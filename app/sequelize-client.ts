import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: false
    },
    logging: true
});

sequelize.authenticate()
.then(() => { console.log("OK"); })
.catch((error) => { console.error(error); });

export default sequelize;