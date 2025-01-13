import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Notification = sequelize.define('Notification', {
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
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    type: {
        type: DataTypes.ENUM('Informational', 'Alert', 'Promotional'), 
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM("HighPriority", "LowPriority"),
        allowNull: false,
    },
    sentby: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Admin"
    },
});

export default Notification;
