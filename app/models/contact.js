import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class Contact extends Model {};

Contact.init({
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
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