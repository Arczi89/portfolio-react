const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection');

class Project extends Model {}

Project.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    client_name: DataTypes.STRING,
    industry: DataTypes.STRING,
    summary: { type: DataTypes.TEXT, allowNull: false },
    challenge: DataTypes.TEXT,
    solution: DataTypes.TEXT,
    project_url: DataTypes.STRING,
    cover_image_url: DataTypes.STRING,
    is_featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    display_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    published_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'Project', tableName: 'projects', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = Project;