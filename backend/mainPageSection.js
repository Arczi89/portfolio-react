const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection'); // Zmienione na require

class MainPageSection extends Model {}

MainPageSection.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.TIME,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.TIME,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'MainPageSection',
  tableName: 'main_page_sections',
  timestamps: false,
});

module.exports = MainPageSection;
