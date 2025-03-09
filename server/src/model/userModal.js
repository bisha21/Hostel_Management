import { sequelize } from '../database.js';
import { DataTypes } from 'sequelize';
import Booking from './bookingModel.js';
import Room from './RoomModal.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    // autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  user_type: {
    type: DataTypes.ENUM('student', 'admin'),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true
});

Room.hasMany(Booking, { foreignKey: "roomId", onDelete: "CASCADE" });
Booking.belongsTo(Room, { foreignKey: "roomId", onDelete: "CASCADE" });

User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export default User;