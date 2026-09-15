const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection');

class Service extends Model {}

Service.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    starting_price: DataTypes.DECIMAL(10, 2),
    delivery_days: DataTypes.INTEGER,
    delivery_hours: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Service;
