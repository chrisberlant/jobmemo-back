import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: false,
        underscored: true,
    },
    logging: console.log,
    set: true,        // Queries only update the fields provided
});

// This hook allows to trim all the data provided by the user before they are inserted into the DB
sequelize.addHook('beforeValidate', (instance) => {
    for (const key in instance.dataValues) {
      if (typeof instance.dataValues[key] === 'string') {
        instance.dataValues[key] = instance.dataValues[key].trim();
      }
    }
  });

// This hook allows to remove userId from the objects after every query to the database
sequelize.addHook('afterFind', (results) => {
  if (results.length > 0) {
    results.forEach((result) => {
      if (result.dataValues.userId) {
        delete result.dataValues.userId;
      }
    });
  } else {
    if (results.dataValues.userId) {
      delete results.dataValues.userId;
    }
  }
});
  

export default sequelize;