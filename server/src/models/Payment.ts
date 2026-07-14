import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.js";
import { Room } from "./Room.js";

export type PaymentGateway = "khalti" | "cash";
export type PaymentStatus = "success" | "pending" | "failed";

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  declare id: CreationOptional<number>;
  declare transactionId: string;
  declare pidx: CreationOptional<string | null>;
  declare amount: number;
  declare paymentGateway: PaymentGateway;
  declare purpose: CreationOptional<string | null>;
  declare status: CreationOptional<PaymentStatus>;
  declare paymentDate: CreationOptional<Date>;
  declare description: CreationOptional<string | null>;
  declare roomId: ForeignKey<Room["id"]>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pidx: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentGateway: {
      type: DataTypes.ENUM("khalti", "cash"),
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("success", "pending", "failed"),
      defaultValue: "pending",
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      defaultValue: "Payment for room booking",
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Payment",
  },
);

Payment.belongsTo(Room, {
  foreignKey: {
    name: "roomId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

export default Payment;
