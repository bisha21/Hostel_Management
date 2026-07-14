"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
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
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentStatus: {
        type: Sequelize.ENUM("pending", "confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      booking_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn("NOW"),
      },
      check_in_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      check_out_complete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cancellation_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancellation_reason: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("Bookings");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Bookings_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Bookings_paymentStatus";');
  },
};
