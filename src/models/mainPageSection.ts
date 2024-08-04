import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../lib/dbConnection';

interface SectionAttributes {
  id: number;
  title: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
}

interface SectionCreationAttributes extends Optional<SectionAttributes, 'id'> {}

class MainPageSection extends Model<SectionAttributes, SectionCreationAttributes> implements SectionAttributes {
  public id!: number;
  public title!: string;
  public body!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

MainPageSection.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  sequelize,
  modelName: 'MainPageSection',
  tableName: 'main_page_sections',
  timestamps: false,
});

export default MainPageSection;
