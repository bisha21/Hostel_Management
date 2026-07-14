"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Maintenances", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      RoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Pending", "Completed", "Cancelled"),
        allowNull: false,
        defaultValue: "Pending",
      },
      maintenance_type: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Maintenances");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Maintenances_status";');
  },
};
