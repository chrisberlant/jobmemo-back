import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        createdAt: 'created_at',
        updatedAt: false,
    },
    logging: true
});

export default sequelize;