import { sequelize } from "../database.js";
import { DataTypes } from "sequelize";
import Room from "./RoomModal.js";

const Payment = sequelize.define("Payment", {
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
    allowNull: false,    
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentGateway: {
    type: DataTypes.ENUM("khalti",'cash'),
    allowNull: false,
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
});

Payment.belongsTo(Room, {
  foreignKey: {
    name: "roomId", 
    allowNull: false,
  },
  onDelete: "CASCADE", 
});

export default Payment;
