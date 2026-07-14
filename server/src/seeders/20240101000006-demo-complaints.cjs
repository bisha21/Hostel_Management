"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Complaints", [
      {
        userId: 2,
        roomId: 1,
        description: "The ceiling fan makes a loud noise at night.",
        status: "Pending",
        feedback: "Please send maintenance as soon as possible.",
        category: "Maintenance",
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 3,
        roomId: 2,
        description: "Room was not cleaned yesterday.",
        status: "Completed",
        feedback: "Resolved after housekeeping visit.",
        category: "Housekeeping",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Complaints", { userId: [2, 3] });
  },
};
