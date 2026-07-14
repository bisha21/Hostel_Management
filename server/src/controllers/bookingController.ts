import type { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Booking, Room } from "../models/index.js";
import { AppError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { sendComplaintMail } from "../services/emailService.js";
import type { CreateBookingInput, UpdateBookingInput } from "../schemas/booking.schema.js";
import type { BookingIdParam, RoomIdParam } from "../schemas/common.schema.js";

export const createBooking = asyncHandler(
  async (req: Request<RoomIdParam, unknown, CreateBookingInput>, res: Response) => {
    const { roomId } = req.params;
    const user = req.user;
    const { startDate } = req.body;

    const room = await Room.findByPk(roomId);
    if (!room) {
      res.status(404).json({ status: "fail", message: "Room not found" });
      return;
    }
    if (!user) {
      res.status(401).json({ status: "fail", message: "User not authenticated" });
      return;
    }

    // Prevent booking if the user already has any active booking, in any room.
    const existingBooking = await Booking.findOne({
      where: {
        userId: user.userId,
        status: { [Op.notIn]: ["cancelled", "completed"] },
      },
    });

    if (existingBooking) {
      res.status(400).json({
        status: "fail",
        message: "You already have an active booking and cannot book another room.",
      });
      return;
    }

    const activeBookings = await Booking.count({
      where: { roomId, status: { [Op.not]: "confirmed" } },
    });

    if (activeBookings >= room.Capacity) {
      room.Status = "Occupied";
      await room.save();
      res.status(400).json({ status: "fail", message: "Room is fully booked" });
      return;
    }

    const parsedStartDate = startDate ? new Date(startDate) : new Date();
    const endDate = new Date(parsedStartDate);
    endDate.setDate(parsedStartDate.getDate() + 30);

    const booking = await Booking.create({
      userId: user.userId,
      roomId,
      total_amount: room.Price,
      status: "pending",
      startDate: parsedStartDate,
      endDate,
    });

    void sendComplaintMail({
      email: user.email,
      subject: "Room has been booked",
      message: `
          A new room booking has been made by a user.
          Room ID: ${roomId}
          Check-in Date: ${parsedStartDate.toLocaleDateString()}
          Check-out Date: ${endDate.toLocaleDateString()}
          Please check your CMS and manage the booking status.
          Thank You
        `,
    });

    res.status(201).json({
      status: "success",
      data: booking,
    });
  },
);

export const getBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.findAll();
  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

/** Despite the name (kept for route compatibility), this fetches a single booking by id. */
export const getAllBookings = asyncHandler(
  async (req: Request<BookingIdParam>, res: Response, next: NextFunction) => {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      next(new AppError("No bookings found", 404));
      return;
    }
    res.status(200).json({
      status: "success",
      data: booking,
    });
  },
);

export const updateBooking = asyncHandler(
  async (req: Request<BookingIdParam, unknown, UpdateBookingInput>, res: Response, next: NextFunction) => {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking || booking.userId !== req.user?.userId) {
      next(new AppError("No booking found", 404));
      return;
    }

    const room = await Room.findByPk(booking.roomId);
    if (!room) {
      next(new NotFoundError("Room not found"));
      return;
    }

    let confirmedBookings = await Booking.count({
      where: { roomId: booking.roomId, status: { [Op.eq]: "confirmed" } },
    });

    booking.status = req.body.status;
    if (booking.status === "cancelled") {
      confirmedBookings = confirmedBookings - 1;
      await room.save();
      await booking.save();
    } else {
      await booking.save();
    }

    if (confirmedBookings === room.Capacity) {
      room.Status = "Occupied";
      await room.save();
      res.status(400).json({ status: "fail", message: "Room is fully booked" });
      return;
    }

    res.status(200).json({
      status: "success",
      data: booking,
    });
  },
);
