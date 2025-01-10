import Room from "../model/RoomModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { deleteOne, getAll, getOne, updateOne } from "./handleFactoryController.js";

// Controller function to create a room
export const createRoom = asyncHandler(async (req, res, next) => {
    const { RoomNumber, Capacity, Status, Type, Description,Price,FloorNumber } = req.body;
    console.log(req.body);

    // Validate input
    if (!RoomNumber || !Capacity || !Status || !Type  || !Price || !FloorNumber) {
        return next(new AppError("All fields are required", 400));
    }



    if (Capacity <= 0) {
        return next(new AppError("Capacity must be greater than zero", 400));
    }

    // Validate status
    const validStatus = ["Available", "Occupied", "Maintenance"];
    if (!validStatus.includes(Status)) {
        return next(new AppError("Invalid status", 400));
    }

    // Create a new room entry
    const room = await Room.create({
        RoomNumber,
        Capacity,
        Status,
        Type,
        Description,
        Price,
        FloorNumber
    });

    return res.status(201).json({
        status: "success",
        data: room,
        message: "Room created successfully",
    });
});


export const updateRoom = updateOne(Room);
export const getRoomById = getOne(Room);
export const getAllRoom = getAll(Room);
export const deleteRoom= deleteOne(Room);