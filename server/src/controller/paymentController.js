import Booking from "../model/bookingModel.js";
import Payment from "../model/paymentModel.js"; // Assuming a payment model exists
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { getEsewaPaymentHash, verifyEsewaPayment } from "../utlis/esewa.js";

// Initialize eSewa Payment
export const initializeEsewaPayment =async (req, res, next) => {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    try{
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

    // Generate payment hash for eSewa
    const paymentInitiate = await getEsewaPaymentHash({
        amount: booking.total_amount,
        transaction_uuid: booking.id, // Use booking ID as transaction reference
    });

    // Log the full response from eSewa payment initiation
    console.log(paymentInitiate); // Ensure `signature`, `signed_field_names`, etc., are returned

    // Check if the necessary fields are available
    if (!paymentInitiate.signature || !paymentInitiate.signed_field_names) {
        return next(new AppError("Failed to initiate payment. Missing payment signature or field names.", 400));
    }

    // Now, create the Payment record in the database
    const payment = await Payment.create({
        transactionId: paymentInitiate.signature, // Using signature as transaction ID (or another relevant field)
        pidx: paymentInitiate.transaction_uuid,
        amount: booking.total_amount,
        paymentGateway: "esewa",
        status: "pending",
        description: `Payment for booking #${bookingId}`,
        roomId: booking.roomId,
    });
    console.log("Payment record created:", payment);
    const redirectURL = `http://localhost:3000/api/payment/complete-payment/${payment.id}?txn_id=${encodeURIComponent(payment.transactionId)}&amt=${payment.amount}&pid=${payment.pidx}`;
    res.redirect(redirectURL);
    
        // Return the payment initiation details along with payment data and booking info
}
    catch (err) {
        return res.status(500).json({
            message: err
        })
    }
};

export const completePayment = asyncHandler(async (req, res, next) => {
    const { txn_id, amt, pid } = req.query;
    console.log(req.query);

    try {
        // Verify the payment with eSewa
        const paymentInfo = await verifyEsewaPayment(req.query);

        // Ensure the payment verification was successful
        if (!paymentInfo.success) {
            return next(new AppError("Payment verification failed", 400));
        }

        // Find the booking record using the transaction ID (txn_id)
        const booking = await Booking.findByPk(pid);

        if (!booking) {
            return next(new AppError("Booking not found for this payment", 404));
        }

        // Ensure the booking is still pending payment
        if (booking.status === "confirmed") {
            return res.status(400).json({
                success: false,
                message: "Booking is already confirmed.",
            });
        }

        // Create or update the payment record
        let payment = await Payment.findOne({ where: { transactionId: txn_id } });
        if (!payment) {
            payment = await Payment.create({
                transactionId: txn_id,
                amount: amt,
                bookingId: booking.id,
                paymentGateway: "esewa",
                status: "success",
                paymentData: paymentInfo, // Store full payment info if needed
            });
        } else {
            payment.status = "success";
            await payment.save();
        }

        // Update the booking status
        booking.status = "confirmed";
        await booking.save();

        res.json({
            success: true,
            message: "Payment successful, booking confirmed.",
            booking,
            payment,
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
