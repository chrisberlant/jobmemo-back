import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class Card extends Model {};

Card.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: DataTypes.TEXT,
  index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  enterprise_name: DataTypes.TEXT,
  enterprise_activity: DataTypes.TEXT,
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
  logo_url: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  sequelize,
  tableName: "card"
});

export default Card;