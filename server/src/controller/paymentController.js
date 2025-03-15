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
            return_url: "http://localhost:5173/student/payment-success",
            website_url: "https://dev.khalti.com/api/v2/",
        });

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

    if (!pidx) {
        return next(new AppError("Missing pidx in request", 400));
    }

    try {
        console.log("🔍 Verifying Khalti payment for pidx:", pidx);

        // ✅ Request Verification from Khalti
        const paymentInfo = await verifyKhaltiPayment({ pidx });

        // ✅ FIX: Check if Khalti's response indicates success
        if (paymentInfo.status !== "Completed") {
            console.error(" Payment verification failed from Khalti:", paymentInfo);
            return next(new AppError("Payment verification failed", 400));
        }

        // ✅ Find Payment Record in Database
        const payment = await Payment.findOne({ where: { pidx } });

        if (!payment) {
            console.error(" No matching payment record found for pidx:", pidx);
            return next(new AppError("Payment record not found", 404));
        }

        // ✅ Get the Booking ID from the `roomId`
        const booking = await Booking.findOne({ where: { roomId: payment.roomId } });

        if (!booking) {
            console.error(" No active booking found for room ID:", payment.roomId);
            return next(new AppError("No active booking found for this room", 404));
        }

        // ✅ Update Payment Status
        await payment.update({ status: "success", transactionId: transaction_id });
        await payment.save();

        // ✅ Update Booking Status
        await booking.update({ status: "confirmed", paymentStatus: "confirmed" });

        await booking.save();

        console.log("✅ Payment verified and booking confirmed!");

        res.status(200).json({
            status: "success",
            message: "Payment verified and booking confirmed.",
        });

    } catch (error) {
        console.error("❌ Error during payment verification:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
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
        console.log("Room", room.id);
        if (!room) {
            return next(new AppError("Room not found", 404));
        }

        const booking = await Booking.findOne({
            where: { roomId: room.id },
            order: [["createdAt", "DESC"]],
        });

        if (!booking) {
            console.log("hehe")
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
        console.log(error);
        return next(new AppError(error.message, 500));
    }
});
