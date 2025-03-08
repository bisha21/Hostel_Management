import { Op, where } from 'sequelize';
import Booking from '../model/bookingModel.js';
import Room from '../model/RoomModal.js';
import AppError from '../utlis/appError.js';
import asyncHandler from '../utlis/catchAsync.js';
import { senComplaintdMail } from '../utlis/complaintEmail.js';

export const createBooking = asyncHandler(async (req, res, next) => {
    const roomId = req.params.roomId;
    const user = req.user;
    const room = await Room.findByPk(roomId);

    if (!room) {
        return res.status(404).json({ status: 'fail', message: 'Room not found' });
    }

    if (!user) {
        return res.status(401).json({ status: 'fail', message: 'User not authenticated' });
    }

    // Check if the user already has an active booking in ANY room
    const existingBooking = await Booking.findOne({
        where: {
            userId: user.userId,
            status: { [Op.notIn]: ['cancelled', 'completed'] }, // Prevent booking if any active booking exists
        },
    });

    if (existingBooking) {
        return res.status(400).json({
            status: 'fail',
            message: 'You already have an active booking and cannot book another room.',
        });
    }

    // Count active bookings for this room
    const activeBookings = await Booking.count({
        where: { roomId: roomId, status: { [Op.not]: 'completed' } }
    });

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

    // Update room status based on bookings
    const updatedBookingsCount = await Booking.count({
        where: { roomId: roomId, status: { [Op.not]: 'completed' } }
    });

    room.Status = updatedBookingsCount >= room.Capacity ? 'Occupied' : 'Available';
    await room.save();

    // Send booking email notification
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
    senComplaintdMail(emailOptions);

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

    if (!booking) {
        return next(new AppError('No booking found', 404));
    }
    console.log("user",req.user)
    // Allow admin to cancel any booking, but users can only cancel their own
    const isAdmin = req.user.user_type === 'admin'; // Assuming role is stored in req.user
    const isUserBooking = booking.userId === req.user.userId;
    if (!isAdmin && !isUserBooking) {
        return next(new AppError('You are not authorized to modify this booking', 403));
    }

    // Handle cancellation
    if (req.body.status === 'cancelled') {
        booking.status = 'cancelled';
        booking.cancellation_date = new Date();
        booking.cancellation_reason = req.body.cancellation_reason || 'No reason provided';

        // Free up the room if no active bookings remain
        const room = await Room.findByPk(booking.roomId);
        const activeBookings = await Booking.count({
            where: { roomId: booking.roomId, status: { [Op.not]: 'cancelled' } }
        });

        if (activeBookings === 0) {
            room.Status = 'Available';
        }

        await room.save();
        await booking.save();
    } else {
        // Update other booking details if needed
        booking.status = req.body.status;
        await booking.save();
    }

    res.status(200).json({
        status: 'success',
        data: booking,
    });
});


// export const updateBooking = asyncHandler(async (req, res, next) => {
//     const booking = await Booking.findByPk(req.params.id);
//     if (!booking && booking.userId !== req.user.userId) {
//         return next(new AppError('No booking found', 404));
//     }
//     booking.status = req.body.status;
//     if (booking.status === 'cancelled') {

//         const room = await Room.findByPk(booking.roomId);
//         room.Status = 'Available';
//         await booking.destroy({ where: { id: booking.id } });
//         await room.save();
//     }
//     await booking.save();
//     res.status(200).json({
//         status: 'success',
//         data: booking,
//     });
// });
