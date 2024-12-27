import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";  // Make sure to adjust the path for your database configuration

// Define the Visitor model
export const Visitor = sequelize.define("Visitor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Students", 
      key: "id",         
    },
    onDelete: "CASCADE", 
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'visitors',  
  timestamps: false,      
});

