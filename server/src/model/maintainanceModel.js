import { sequelize } from '../database.js';
import { DataTypes } from 'sequelize';

const Maintenance = sequelize.define('Maintenance', {
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
      model: 'Rooms',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  
  description: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM("Pending", "Completed","Cancelled"),
    allowNull: false,
    defaultValue:"Pending",
  },
  maintenance_type:{
    type:DataTypes.STRING,
    allowNull:false
  }

  
},{
  timestamps: true
}
 );


export default Maintenance;
