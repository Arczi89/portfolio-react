const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConnection');

class ConsultantProfile extends Model {}

ConsultantProfile.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    headline: { type: DataTypes.STRING, allowNull: false },
    introduction: { type: DataTypes.TEXT, allowNull: false },
    photo_url: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    location: DataTypes.STRING,
    linkedin_url: DataTypes.STRING,
    github_url: DataTypes.STRING,
  },
  { sequelize, modelName: 'ConsultantProfile', tableName: 'consultant_profiles', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = ConsultantProfile;