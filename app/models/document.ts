import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client'

class Document extends Model {};

Document.init({
  title: DataTypes.TEXT,
  type: DataTypes.TEXT,
  url: DataTypes.TEXT
}, {
  sequelize,
  tableName: "document"
});

export default Document;