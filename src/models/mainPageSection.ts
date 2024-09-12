import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../lib/dbConnection';

interface SectionAttributes {
  id: number;
  tag: string;
  item_order: number;
  title?: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
}

interface SectionCreationAttributes extends Optional<SectionAttributes, 'id'> {}

class MainPageSection extends Model<SectionAttributes, SectionCreationAttributes> implements SectionAttributes {
  public id!: number;
  public tag!: string;
  public item_order!: number;
  public title!: string;
  public body!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public image!: string;
}

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

export default MainPageSection;
