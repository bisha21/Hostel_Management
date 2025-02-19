import { Op, where } from 'sequelize';
import Booking from '../model/bookingModel.js';
import Room from '../model/RoomModal.js';
import AppError from '../utlis/appError.js';
import asyncHandler from '../utlis/catchAsync.js';
import { senComplaintdMail } from '../utlis/complaintEmail.js';

export const createBooking = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId;
    const user = req.user;
    console.log("Yout hiy")

    const room = await Room.findByPk(roomId);

    if (!room) {
        return res.status(404).json({ status: 'fail', message: 'Room not found' });
    }

    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'User not authenticated' });
    }

    // Count active bookings for this room
    const activeBookings = await Booking.count({
        where: { roomId: roomId, status: { [Op.not]: 'completed' } }
    });
    console.log(activeBookings);

    if (activeBookings >= room.Capacity) {
        return res.status(400).json({ status: 'fail', message: 'Room is fully booked' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 5);

    // Create booking
    const booking = await Booking.create({
        userId: user.userId,
        roomId: roomId,
        total_amount: room.Price,
        status: 'pending',
        startDate,
        endDate
    });

    if (booking) {
        if (activeBookings + 1 >= room.capacity) {
            room.Status = 'Occupied';
        } else {
            room.Status = 'Available';
        }
        await room.save();
    }

    const emailOptions = {
        email: req.user.email,
        subject: 'Room has been booked',
        message: `
          A new room booking has been made by a user.
          Room ID: ${roomId}
          Please check your CMS and manage the booking status.
          Thank You
        `,
    };
    // senComplaintdMail(emailOptions);

    res.status(201).json({
        status: 'success',
        data: booking,
    });
});

export const getBookings = asyncHandler(async (req, res, next) => {

    const bookings = await Booking.findAll();
    if (!bookings) {
        return next(new AppError('No bookings found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: bookings,
    });

})

export const getAllBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.findByPk(req.params.id);
    if (!bookings) {
        return next(new AppError('No bookings found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: bookings,
    });
});

export const updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking && booking.userId !== req.user.userId) {
        return next(new AppError('No booking found', 404));
    }
    booking.status = req.body.status;
    if (booking.status === 'cancelled') {

        const room = await Room.findByPk(booking.roomId);
        room.Status = 'Available';
        await booking.destroy({ where: { id: booking.id } });
        await room.save();
    }
    await booking.save();
    res.status(200).json({
        status: 'success',
        data: booking,
    });
});
