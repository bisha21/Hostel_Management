"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DiningSchedules", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      day: {
        type: Sequelize.ENUM(
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ),
        allowNull: false,
      },
      mealType: {
        type: Sequelize.ENUM("breakfast", "lunch", "snacks", "dinner"),
        allowNull: false,
      },
      items: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
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

    await queryInterface.addIndex("DiningSchedules", ["day", "mealType"], {
      unique: true,
      name: "dining_schedules_day_meal_type_unique",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("DiningSchedules");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_DiningSchedules_day";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_DiningSchedules_mealType";');
  },
};
