import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class User extends Model {};

User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar_url: DataTypes.TEXT
}, {
  sequelize,
  tableName: "user"
});

export default User;