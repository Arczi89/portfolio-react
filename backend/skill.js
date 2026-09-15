const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection');

class Skill extends Model {}

Skill.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false },
    proficiency: DataTypes.STRING,
    display_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, modelName: 'Skill', tableName: 'skills', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = Skill;