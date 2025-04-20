import { Op, where } from "sequelize";
import Booking from "../model/bookingModel.js";
import Room from "../model/RoomModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { senComplaintdMail } from "../utlis/complaintEmail.js";

export const createBooking = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const user = req.user;
  // Get the start date from request body
  const { startDate } = req.body;

  const room = await Room.findByPk(roomId);
  if (!room) {
    return res.status(404).json({ status: "fail", message: "Room not found" });
  }
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not authenticated" });
  }

  // Check if the user already has an active booking in ANY room
  const existingBooking = await Booking.findOne({
    where: {
      userId: user.userId,
      status: { [Op.notIn]: ["cancelled", "completed"] }, // Prevent booking if any active booking exists
    },
  });

  if (existingBooking) {
    return res.status(400).json({
      status: "fail",
      message:
        "You already have an active booking and cannot book another room.",
    });
  }

  // Count active bookings for this room
  let activeBookings = await Booking.count({
    where: { roomId: roomId, status: { [Op.not]: "confirmed" } },
  });

  if (activeBookings >= room.Capacity) {
    activeBookings = room.Capacity;
    room.Status = "Occupied";
    await room.save();
    return res
      .status(400)
      .json({ status: "fail", message: "Room is fully booked" });
  }

  // Use provided start date or default to current date
  const parsedStartDate = startDate ? new Date(startDate) : new Date();
  const endDate = new Date(parsedStartDate);
  endDate.setDate(parsedStartDate.getDate() + 30); // Set end date 30 days after start date

  // Create booking
  const booking = await Booking.create({
    userId: user.userId,
    roomId: roomId,
    total_amount: room.Price,
    status: "pending",
    startDate: parsedStartDate,
    endDate,
  });

  // Send booking email notification
  const emailOptions = {
    email: req.user.email,
    subject: "Room has been booked",
    message: `
          A new room booking has been made by a user.
          Room ID: ${roomId}
          Check-in Date: ${parsedStartDate.toLocaleDateString()}
          Check-out Date: ${endDate.toLocaleDateString()}
          Please check your CMS and manage the booking status.
          Thank You
        `,
  };

  senComplaintdMail(emailOptions);

  res.status(201).json({
    status: "success",
    data: booking,
  });
});

export const getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.findAll();
  if (!bookings) {
    return next(new AppError("No bookings found", 404));
  }
  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

export const getAllBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.findByPk(req.params.id);
  if (!bookings) {
    return next(new AppError("No bookings found", 404));
  }
  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

export const updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id);
  const roomId = booking.roomId;
  const room = await Room.findByPk(roomId);
  if (!booking && booking.userId !== req.user.userId) {
    return next(new AppError("No booking found", 404));
  }
  // let activeBookings = await Booking.count({
  //     where: { roomId: roomId, status: { [Op.not]: 'confirmed' } }
  // });
  let confirmedBookings = await Booking.count({
    where: { roomId: roomId, status: { [Op.eq]: "confirmed" } },
  });

  booking.status = req.body.status;
  if (booking.status === "cancelled") {
    confirmedBookings = confirmedBookings - 1;
    await room.save();
    await booking.save();
  } else {
    // Update other booking details if needed
    booking.status = req.body.status;
    await booking.save();
  }

  if (confirmedBookings === room.Capacity) {
    room.Status = "Occupied";
    await room.save();
    return res
      .status(400)
      .json({ status: "fail", message: "Room is fully booked" });
  }
  console.log(confirmedBookings, "aaaaaaaaa");

  await booking.save();
  res.status(200).json({
    status: "success",
    data: booking,
  });
});
