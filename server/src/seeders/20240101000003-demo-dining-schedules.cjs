"use strict";

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const MEALS = {
  breakfast: {
    startTime: "07:30:00",
    endTime: "09:00:00",
    items: ["Tea/Coffee", "Bread & Omelette", "Seasonal Fruit"],
  },
  lunch: {
    startTime: "12:00:00",
    endTime: "14:00:00",
    items: ["Dal", "Rice", "Vegetable Curry", "Pickle"],
  },
  snacks: {
    startTime: "16:30:00",
    endTime: "17:30:00",
    items: ["Tea/Coffee", "Biscuits"],
  },
  dinner: {
    startTime: "19:00:00",
    endTime: "21:00:00",
    items: ["Dal", "Rice", "Chicken/Vegetable Curry", "Salad"],
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [];

    for (const day of DAYS) {
      for (const [mealType, meal] of Object.entries(MEALS)) {
        rows.push({
          day,
          mealType,
          items: JSON.stringify(meal.items),
          startTime: meal.startTime,
          endTime: meal.endTime,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await queryInterface.bulkInsert("DiningSchedules", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("DiningSchedules", { day: DAYS });
  },
};
