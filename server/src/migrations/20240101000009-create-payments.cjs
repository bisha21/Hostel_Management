"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      pidx: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentGateway: {
        type: Sequelize.ENUM("khalti", "cash"),
        allowNull: false,
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("success", "pending", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: "Payment for room booking",
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Payments");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Payments_paymentGateway";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Payments_status";');
  },
};
