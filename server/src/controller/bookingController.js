import Booking from '../model/bookingModel.js';
import Room from '../model/RoomModal.js';
import AppError from '../utlis/appError.js';
import asyncHandler from '../utlis/catchAsync.js';

export const createBooking = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId;
    const user = req.user;
    // Assumes `req.user` is set after authentication middleware

    // Fetch the room details
    const room = await Room.findByPk(roomId);

    // Check if room exists
    if (!room) {
        return res.status(404).json({ status: 'fail', message: 'Room not found' });
    }
    if (room.Status === 'Occupied') {
        return res.status(400).json({ status: 'fail', message: 'Room is already occupied' });
    }

    // Check if user exists
    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'User not authenticated' });
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 5);
    // Create the booking
    const booking = await Booking.create({
        userId: user.userId,
        roomId: roomId,
        total_amount: room.Price,
        status: 'pending',
        startDate,
        endDate
    });
    if (!booking) {
        room.Status = 'Available';
        await room.save(); // await
    }
    if (booking) {
        room.Status = 'Occupied';
        await room.save();
    }


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
    await booking.save();
    res.status(200).json({
        status: 'success',
        data: booking,
    });
});
