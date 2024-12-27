import { sequelize } from '../database.js';
import { DataTypes } from 'sequelize';
// import Feedback from './feedbackModel.js'; // Feedback model

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
  ratingsAverage: {
    type: DataTypes.DECIMAL(3, 1), // Store with 1 decimal precision
    defaultValue: 4.5,
    validate: {
      min: {
        args: [1],
        msg: 'Rating must be above 1.0',
      },
      max: {
        args: [5],
        msg: 'Rating must be below 5.0',
      },
    },
    set(value) {
      this.setDataValue('ratingsAverage', Math.round(value * 10) / 10);
    },
  },
  ratingsQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

// Mess has many Feedback
// Mess.hasMany(Feedback, { foreignKey: 'messId' });

export default Mess;
