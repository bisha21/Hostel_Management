import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.js";
import type { User } from "./User.js";

export type AttendanceStatus = "present" | "absent";

export class Attendance extends Model<InferAttributes<Attendance>, InferCreationAttributes<Attendance>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare date: string;
  declare status: AttendanceStatus;
  declare is_approved: CreationOptional<boolean | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Attendance.init(
  {
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("present", "absent"),
      allowNull: false,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  },
);

export default Attendance;
