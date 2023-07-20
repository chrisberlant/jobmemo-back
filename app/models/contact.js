import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class Contact extends Model {};

Contact.init({
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  occupation: DataTypes.TEXT,
  email: DataTypes.TEXT,
  phone: DataTypes.TEXT,
  linkedinProfile: DataTypes.TEXT,
  enterprise: DataTypes.TEXT,
  comments: DataTypes.TEXT,
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '#fff'
  }
}, {
  sequelize,
  tableName: "contact"
});

export default Contact;