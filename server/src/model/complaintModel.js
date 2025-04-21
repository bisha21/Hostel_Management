import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const Complaint = sequelize.define("Complaint", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
  roomId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Rooms",
      key: "id",
    },
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Completed"),
    allowNull: false,
    defaultValue: "Pending",
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM("Maintenance", "Housekeeping", "Room Change"),
    allowNull: false,
  },
});
