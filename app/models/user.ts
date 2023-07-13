import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client'

class User extends Model {};

User.init({
  email: DataTypes.TEXT,
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  password: DataTypes.TEXT,
  avatar_url: DataTypes.TEXT,
}, {
  sequelize,
  tableName: "user"
});

export default User;