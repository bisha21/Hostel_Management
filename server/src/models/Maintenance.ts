import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.js";
import type { Room } from "./Room.js";

export type MaintenanceStatus = "Pending" | "Completed" | "Cancelled";

export class Maintenance extends Model<InferAttributes<Maintenance>, InferCreationAttributes<Maintenance>> {
  declare id: CreationOptional<number>;
  declare RoomId: ForeignKey<Room["id"]>;
  declare description: string;
  declare status: CreationOptional<MaintenanceStatus>;
  declare maintenance_type: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Maintenance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rooms",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
      allowNull: false,
      defaultValue: "Pending",
    },
    maintenance_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Maintenance",
    timestamps: true,
  },
);

export default Maintenance;
