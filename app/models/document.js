import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class Document extends Model {};

Document.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Nouveau document'
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Autre'
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  }
}, {
  sequelize,
  tableName: "document"
});

export default Document;