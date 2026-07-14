"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Payments", [
      {
        transactionId: "TXN-DEMO-0001",
        amount: 48000,
        paymentGateway: "khalti",
        purpose: "Room booking payment",
        status: "success",
        paymentDate: new Date("2025-12-20"),
        description: "Payment for room booking",
        roomId: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        transactionId: "TXN-DEMO-0002",
        amount: 36000,
        paymentGateway: "cash",
        purpose: "Room booking payment",
        status: "success",
        paymentDate: new Date("2025-12-22"),
        description: "Payment for room booking",
        roomId: 2,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Payments", {
      transactionId: ["TXN-DEMO-0001", "TXN-DEMO-0002"],
    });
  },
};
