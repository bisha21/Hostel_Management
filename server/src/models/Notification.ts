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

export type NotificationType = "Informational" | "Alert" | "Promotional";
export type NotificationPriority = "HighPriority" | "LowPriority";

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare message: string;
  declare time: CreationOptional<Date>;
  declare type: NotificationType;
  declare priority: NotificationPriority;
  declare sentby: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Notification.init(
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.ENUM("Informational", "Alert", "Promotional"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("HighPriority", "LowPriority"),
      allowNull: false,
    },
    sentby: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Admin",
    },
  },
  {
    sequelize,
    modelName: "Notification",
  },
);

export default Notification;
