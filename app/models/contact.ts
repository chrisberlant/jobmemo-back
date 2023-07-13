import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client'

class Contact extends Model {};

Contact.init({
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  occupation: DataTypes.TEXT,
  email: DataTypes.TEXT,
  phone: DataTypes.TEXT,
  linkedin_profile: DataTypes.TEXT,
  enterprise: DataTypes.TEXT,
  comments: DataTypes.TEXT,
  color: DataTypes.TEXT
}, {
  sequelize,
  tableName: "contact"
});

export default Contact;