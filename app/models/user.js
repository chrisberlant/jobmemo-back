import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class User extends Model {};

User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '/img/default_avatar.png'
  }
}, {
  sequelize,
  tableName: "user"
});

export default User;