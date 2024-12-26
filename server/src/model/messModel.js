import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";

const Mess = sequelize.define('Mess', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ScheduleDate: {
    type: DataTypes.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    allowNull: false,
  },
  MealOptions: {
    type: DataTypes.JSON, // Use JSON to store array or structured data
    allowNull: false,
  },
}, {
  timestamps:  true, 
});

export default Mess