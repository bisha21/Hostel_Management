"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("Rooms", [
      {
        id: 1,
        RoomNumber: "101",
        Capacity: 1,
        Status: "Occupied",
        Type: "Single",
        Price: 8000,
        Description: "Cozy single room with attached bath",
        FloorNumber: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        RoomNumber: "102",
        Capacity: 2,
        Status: "Occupied",
        Type: "Double",
        Price: 6000,
        Description: "Comfortable double sharing room",
        FloorNumber: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        RoomNumber: "103",
        Capacity: 3,
        Status: "Available",
        Type: "Triple",
        Price: 4500,
        Description: "Spacious triple sharing room",
        FloorNumber: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        RoomNumber: "201",
        Capacity: 1,
        Status: "Available",
        Type: "Single",
        Price: 8500,
        Description: "Single room with balcony",
        FloorNumber: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 5,
        RoomNumber: "202",
        Capacity: 2,
        Status: "Available",
        Type: "Double",
        Price: 6500,
        Description: "Double room with study desk",
        FloorNumber: 2,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Rooms", { id: [1, 2, 3, 4, 5] });
  },
};
