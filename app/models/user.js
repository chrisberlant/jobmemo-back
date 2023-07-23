import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class User extends Model {};

User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '/img/default_avatar.png'
  },
  address: DataTypes.TEXT
}, {
  sequelize,
  tableName: "user"
});

export default User;