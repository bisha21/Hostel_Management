"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      RoomNumber: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      Capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Status: {
        type: Sequelize.ENUM("Available", "Occupied"),
        allowNull: true,
        defaultValue: "Available",
      },
      Type: {
        type: Sequelize.ENUM("Single", "Double", "Triple"),
        allowNull: false,
      },
      Price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      FloorNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Rooms");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Rooms_Status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Rooms_Type";');
  },
};
