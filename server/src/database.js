import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('hostel_management', 'root', 'Bishal@#1234', {
  host: 'localhost',
  dialect: 'mysql'
});