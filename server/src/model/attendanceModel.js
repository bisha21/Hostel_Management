import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

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
    type: DataTypes.DATEONLY, // Store only the date (not time)
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("present", "absent"),
    allowNull: false,
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ["userId", "date"],
    },
  ],
});
