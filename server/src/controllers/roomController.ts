import type { NextFunction, Request, Response } from "express";
import { Booking, Room } from "../models/index.js";
import type { RoomStatus } from "../models/index.js";
import { NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { deleteOne, updateOne } from "./handleFactoryController.js";
import type { CreateRoomInput } from "../schemas/room.schema.js";
import type { IdParam } from "../schemas/common.schema.js";

export const createRoom = asyncHandler(
  async (req: Request<object, unknown, CreateRoomInput>, res: Response) => {
    const { RoomNumber, Capacity, Status, Type, Description, Price, FloorNumber } = req.body;

    const room = await Room.create({
      RoomNumber,
      Capacity,
      // "Maintenance" is accepted here to match the original request-level check,
      // even though the Status column only stores Available/Occupied.
      Status: Status as RoomStatus,
      Type,
      Description,
      Price,
      FloorNumber,
    });

    res.status(201).json({
      status: "success",
      data: room,
      message: "Room created successfully",
    });
  },
);

export const getRoomById = asyncHandler(
  async (req: Request<IdParam>, res: Response, next: NextFunction) => {
    const room = await Room.findByPk(req.params.id, {
      include: [{ model: Booking, as: "bookings" }],
    });

    if (!room) {
      next(new NotFoundError("Room not found"));
      return;
    }

    res.status(200).json({
      status: "success",
      data: room,
    });
  },
);

export const getAllRoom = asyncHandler(async (_req: Request, res: Response) => {
  const room = await Room.findAll({
    include: [{ model: Booking, as: "bookings" }],
  });

  res.status(200).json({
    status: "success",
    data: room,
  });
});

export const updateRoom = updateOne(Room);
export const deleteRoom = deleteOne(Room);
