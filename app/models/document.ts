import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client'

class Document extends Model {};

Document.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: DataTypes.TEXT,
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "document"
});

export default Document;