import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('hostelmanagement', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});