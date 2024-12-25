import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "Admin"
  }
},{
    timestamps:true,
});
export default Admin;


