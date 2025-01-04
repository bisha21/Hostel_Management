import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('hostel_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});