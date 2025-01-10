import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";  // Make sure to adjust the path for your database configuration

// Define the Visitor model
export const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", 
      key: "id",         
    },
    onDelete: "CASCADE", 
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,

  },
  status:{
    type: DataTypes.ENUM('present', 'absent'),
    allowNull: false
  },
  reason:{
    type: DataTypes.STRING(255),
    // allowNull: false,
  },
  location:{
    type: DataTypes.STRING(255),
  },
  is_approved:{
    type: DataTypes.BOOLEAN,
  }


});

