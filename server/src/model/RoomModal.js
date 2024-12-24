import { sequelize } from "../database.js";

import { DataTypes } from 'sequelize';
const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    RoomNumber: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
    },
    Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('Available', 'Occupied'),
        defaultValue: 'Available',
        allowNull: true,
    },
    Preferences: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    timestamps: false, // assuming no createdAt and updatedAt fields
});



export default Room;