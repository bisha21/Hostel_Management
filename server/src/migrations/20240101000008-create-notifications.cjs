"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
      type: {
        type: Sequelize.ENUM("Informational", "Alert", "Promotional"),
        allowNull: false,
      },
      priority: {
        type: Sequelize.ENUM("HighPriority", "LowPriority"),
        allowNull: false,
      },
      sentby: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Admin",
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
    await queryInterface.dropTable("Notifications");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Notifications_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Notifications_priority";');
  },
};
