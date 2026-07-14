"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Reports", [
      {
        userId: 1,
        report_name: "Monthly Occupancy Report - June 2026",
        type: "Occupancy",
        report_status: "submitted",
        generated_details: "3 of 5 rooms occupied, 2 confirmed bookings, 1 pending.",
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        report_name: "Monthly Revenue Report - June 2026",
        type: "Revenue",
        report_status: "processing",
        generated_details: "Revenue collected: Rs. 84,000 from 2 confirmed bookings.",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Reports", { userId: [1] });
  },
};
