import Booking from "../model/bookingModel.js";
import Payment from "../model/paymentModel.js";
import Room from "../model/RoomModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { initializeKhaltiPayment, verifyKhaltiPayment } from "../utlis/khalti.js";


// Initialize Khalti Paymen
export const initializeKhaltiPaymentHandler = async (req, res, next) => {
    const { bookingId } = req.params;

    try {
        // Fetch the booking details by bookingId
        const booking = await Booking.findByPk(bookingId);

        // Ensure the booking exists
        if (!booking) {
            return next(new AppError("Booking not found", 404));
        }

        // Ensure the booking has not already been paid
        if (booking.status === "confirmed") {
            return res.status(400).json({
                status: "fail",
                message: "Payment has already been completed for this booking.",
            });
        }

        // Generate payment details for Khalti
        const paymentInitiate = await initializeKhaltiPayment({
            amount: booking.total_amount * 100, // Amount in paisa (Rs * 100)
            purchase_order_id: String(booking.id), // Use booking ID as transaction reference
            purchase_order_name: `Booking #${bookingId}`,
            return_url: "http://localhost:5173/student/rooms",
            website_url: "https://dev.khalti.com/api/v2/",
        });

        console.log("Initiated payment:", paymentInitiate);
        if (paymentInitiate) {
            Booking.paymentStatus = "confirmed";
        }

        // Check if the necessary fields are available
        if (!paymentInitiate.pidx || !paymentInitiate.payment_url) {
            return next(
                new AppError(
                    "Failed to initiate payment. Missing payment pidx or payment_url field.",
                    400
                )
            );
        }

        // Create the Payment record in the database
        const payment = await Payment.create({
            transactionId: paymentInitiate.pidx,
            pidx: paymentInitiate.pidx,
            amount: booking.total_amount,
            paymentGateway: "khalti",
            status: "pending",
            description: `Payment for booking #${bookingId}`,
            roomId: booking.roomId,
        });

        res.status(200).json({
            status: "success",
            message: "Payment initiated successfully. Redirect to Khalti for completion.",
            payment_url: paymentInitiate.payment_url, // Send the payment URL to the frontend
            payment,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
        });
    }
};


export const completeKhaltiPayment = asyncHandler(async (req, res, next) => {
    const { token, amount, transaction_id, pidx } = req.query;

    if (!token || !amount || isNaN(amount)) {
        return next(new AppError("Missing or invalid query parameters", 400));
    }

    try {
        // Log the query parameters for debugging
        console.log("Payment details received:", req.query);

        // Verify the Khalti payment
        const paymentInfo = await verifyKhaltiPayment({ token: token.trim(), amount: amount.trim() });

        // Check if payment verification was successful
        if (!paymentInfo?.success) {
            return next(new AppError("Payment verification failed", 400));
        }

        // Find the payment record in the database
        const payment = await Payment.findOne({ where: { transactionId: pidx.trim() } });
        if (!payment) {
            return next(new AppError("Payment record not found", 404));
        }

        // Start a database transaction to update payment and booking statuses
        const transaction = await sequelize.transaction(async (t) => {
            await payment.update({ status: "confirmed" }, { transaction: t });

            // Update booking status using the bookingId from the payment record
            await Booking.update(
                { status: "confirmed" },
                { where: { id: payment.bookingId }, transaction: t }
            );
        });

        // Return a success response after the payment is verified and booking is confirmed
        res.status(200).json({
            status: "success",
            message: "Payment verified and booking confirmed.",
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error during payment verification:", error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});



export const getAllPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findAll();
    if (payment.length === 0) {
        return next(new AppError("Payment not found", 404));
    }
    return res.status(200).json({
        sucess: true,
        data: payment,
    });
})
export const deletePayment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
        return next(new AppError("No payment found", 404));
    }
    await payment.destroy();
    return res.status(200).json({
        sucess: true,
        message: "Payment deleted successfully"
    })


})


export const processCashPayment = asyncHandler(async (req, res, next) => {
    const { purpose, transactionId, amount, roomName } = req.body;
    console.log(req.body);

    try {
        const room = await Room.findOne({ where: { RoomNumber: roomName } });
        if (!room) {
            return next(new AppError("Room not found", 404));
        }

        const booking = await Booking.findOne({
            where: { id: room.id, status: "pending" },
            order: [["createdAt", "DESC"]],
        });

        if (!booking) {
            return next(new AppError("No active booking found for this room", 404));
        }

        if (!transactionId) {
            return next(new AppError("Transaction ID is required", 400));
        }

        if (booking.status === "confirmed") {
            return res.status(400).json({
                status: "fail",
                message: "Payment has already been completed for this booking.",
            });
        }

        const payment = await Payment.create({
            transactionId: `cash-${transactionId}`,
            amount: amount || booking.total_amount,
            paymentGateway: "cash",
            status: "success",
            description: `Cash payment for booking #${booking.id}`,
            roomId: booking.roomId,
            purpose: purpose,
        });

        if (payment) {
            booking.status = "confirmed";
            await booking.save();
        }

        res.status(200).json({
            status: "success",
            message: "Cash payment recorded successfully.",
            payment,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});
