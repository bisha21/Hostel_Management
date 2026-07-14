"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Attendances", [
      { userId: 2, date: "2026-07-10", status: "present", is_approved: true, createdAt: now, updatedAt: now },
      { userId: 2, date: "2026-07-11", status: "present", is_approved: true, createdAt: now, updatedAt: now },
      { userId: 2, date: "2026-07-12", status: "absent", is_approved: false, createdAt: now, updatedAt: now },
      { userId: 3, date: "2026-07-10", status: "present", is_approved: true, createdAt: now, updatedAt: now },
      { userId: 3, date: "2026-07-11", status: "absent", is_approved: null, createdAt: now, updatedAt: now },
      { userId: 3, date: "2026-07-12", status: "present", is_approved: true, createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Attendances", { userId: [2, 3] });
  },
};
