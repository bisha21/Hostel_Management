import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/database.js";

export type RoomType = "Single" | "Double" | "Triple";
export type RoomStatus = "Available" | "Occupied";

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  declare id: CreationOptional<number>;
  declare RoomNumber: string;
  declare Capacity: number;
  declare Status: CreationOptional<RoomStatus | null>;
  declare Type: RoomType;
  declare Price: number;
  declare Description: CreationOptional<string | null>;
  declare FloorNumber: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Room.init(
  {
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
      type: DataTypes.ENUM("Available", "Occupied"),
      defaultValue: "Available",
      allowNull: true,
    },
    Type: {
      type: DataTypes.ENUM("Single", "Double", "Triple"),
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    FloorNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Room",
  },
);

export default Room;
