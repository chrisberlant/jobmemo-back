import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize-client.js'

class Card extends Model {};

Card.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Mes offres'
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  enterpriseName: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "Nom de l'entreprise",
  },
  enterpriseActivity: DataTypes.TEXT,
  contractType: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Autre'
  },
  description: DataTypes.TEXT,
  offerUrl: DataTypes.TEXT,
  location: DataTypes.TEXT,
  salary: DataTypes.TEXT,
  jobTitle: DataTypes.TEXT,
  notation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '#fff'
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  notes: DataTypes.TEXT,
  reminder: DataTypes.DATE,
  logoUrl: DataTypes.TEXT,
}, {
  timestamps: true,
  updatedAt: false,
  createdAt: true,
  sequelize,
  tableName: "card"
});

export default Card;