import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client'

class Card extends Model {};

Card.init({
  title: DataTypes.TEXT,
  category: DataTypes.TEXT,
  index: DataTypes.INTEGER,
  enterprise_name: DataTypes.TEXT,
  contract_type: DataTypes.TEXT,
  description: DataTypes.TEXT,
  offer_url: DataTypes.TEXT,
  location: DataTypes.TEXT,
  salary: DataTypes.TEXT,
  job_title: DataTypes.TEXT,
  notation: DataTypes.INTEGER,
  color: DataTypes.TEXT,
  is_deleted: DataTypes.BOOLEAN,
  notes: DataTypes.TEXT,
  reminder: DataTypes.DATE,
}, {
  sequelize,
  tableName: "card"
});

export default Card;