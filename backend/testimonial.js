const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection');

class Testimonial extends Model {}

Testimonial.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    author_name: { type: DataTypes.STRING, allowNull: false },
    author_role: DataTypes.STRING,
    company_name: DataTypes.STRING,
    quote: { type: DataTypes.TEXT, allowNull: false },
    project_id: DataTypes.INTEGER,
    is_published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    display_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, modelName: 'Testimonial', tableName: 'testimonials', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = Testimonial;