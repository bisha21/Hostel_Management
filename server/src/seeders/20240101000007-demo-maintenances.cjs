"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Maintenances", [
      {
        RoomId: 1,
        description: "Fix noisy ceiling fan",
        status: "Pending",
        maintenance_type: "Electrical",
        createdAt: now,
        updatedAt: now,
      },
      {
        RoomId: 3,
        description: "Repaint walls before next occupancy",
        status: "Completed",
        maintenance_type: "Painting",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Maintenances", { RoomId: [1, 3] });
  },
};
