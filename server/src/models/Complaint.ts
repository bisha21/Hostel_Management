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
import type { Room } from "./Room.js";

export type ComplaintStatus = "Pending" | "Completed";
export type ComplaintCategory = "Maintenance" | "Housekeeping" | "Room Change";

export class Complaint extends Model<InferAttributes<Complaint>, InferCreationAttributes<Complaint>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare roomId: ForeignKey<Room["id"]>;
  declare description: string;
  declare status: CreationOptional<ComplaintStatus>;
  declare feedback: string;
  declare category: ComplaintCategory;
}

Complaint.init(
  {
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
  },
  {
    sequelize,
    modelName: "Complaint",
  },
);

export default Complaint;
