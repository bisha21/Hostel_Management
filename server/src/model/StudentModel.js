import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; // Update this path based on your sequelize instance

const Student = sequelize.define('Student', {
  // Define fields based on your table structure
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  Phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  RoomID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Rooms',
      key: 'id',
    },
  },
  Attendance: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  LeaveStatus: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'Students', // The table name in the database
  timestamps: false, // Set to true if you have `createdAt` and `updatedAt` columns
});

export default Student;
