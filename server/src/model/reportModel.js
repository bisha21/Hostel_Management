import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const Report = sequelize.define('Report', {
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

        }
    },
    report_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    report_status: {
        type: DataTypes.ENUM("submitted", "processing"),
        defaultValue: "processing",
    },
    generated_details: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});