"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Notifications", [
      {
        userId: 2,
        message: "Your booking for Room 101 has been confirmed.",
        time: now,
        type: "Informational",
        priority: "LowPriority",
        sentby: "Admin",
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 3,
        message: "Scheduled water outage tomorrow from 10 AM to 12 PM.",
        time: now,
        type: "Alert",
        priority: "HighPriority",
        sentby: "Admin",
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 4,
        message: "Your room change request is pending review.",
        time: now,
        type: "Informational",
        priority: "LowPriority",
        sentby: "Admin",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Notifications", { userId: [2, 3, 4] });
  },
};
