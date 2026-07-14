"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Bookings", [
      {
        id: 1,
        userId: 2,
        roomId: 1,
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-06-30"),
        status: "confirmed",
        paymentStatus: "confirmed",
        total_amount: 48000.0,
        booking_date: new Date("2025-12-20"),
        check_in_completed: true,
        check_out_complete: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        userId: 3,
        roomId: 2,
        startDate: new Date("2026-01-05"),
        endDate: new Date("2026-06-30"),
        status: "confirmed",
        paymentStatus: "confirmed",
        total_amount: 36000.0,
        booking_date: new Date("2025-12-22"),
        check_in_completed: true,
        check_out_complete: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        userId: 4,
        roomId: 3,
        startDate: new Date("2026-02-01"),
        endDate: new Date("2026-07-31"),
        status: "pending",
        paymentStatus: "pending",
        total_amount: 27000.0,
        booking_date: new Date("2026-01-15"),
        check_in_completed: false,
        check_out_complete: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Bookings", { id: [1, 2, 3] });
  },
};
