"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = bcrypt.hashSync("Password@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        username: "Admin",
        email: "admin@hostelhive.com",
        password: passwordHash,
        user_type: "admin",
        address: "Putalisadak, Kathmandu",
        phone_number: "9800000001",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        username: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        password: passwordHash,
        user_type: "student",
        address: "Baneshwor, Kathmandu",
        phone_number: "9800000002",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        username: "Priya Gurung",
        email: "priya.gurung@example.com",
        password: passwordHash,
        user_type: "student",
        address: "Patan, Lalitpur",
        phone_number: "9800000003",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        username: "Bishal Thapa",
        email: "bishal.thapa@example.com",
        password: passwordHash,
        user_type: "student",
        address: "Boudha, Kathmandu",
        phone_number: "9800000004",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 5,
        username: "Sunita Rai",
        email: "sunita.rai@example.com",
        password: passwordHash,
        user_type: "student",
        address: "Koteshwor, Kathmandu",
        phone_number: "9800000005",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", { id: [1, 2, 3, 4, 5] });
  },
};
