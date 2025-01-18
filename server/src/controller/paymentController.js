import Booking from "../model/bookingModel.js";
import Payment from "../model/paymentModel.js"; // Assuming a payment model exists
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { getEsewaPaymentHash, verifyEsewaPayment } from "../utlis/esewa.js";

// Initialize eSewa Payment
export const initializeEsewaPayment = async (req, res, next) => {
    const { bookingId } = req.params;
    const userId = req.user.userId;

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
            transactionId: 'bishal' + paymentInitiate.transaction_uuid, // Using signature as transaction ID (or another relevant field)
            pidx: paymentInitiate.transaction_uuid,
            amount: booking.total_amount,
            paymentGateway: "esewa",
            status: "pending",
            description: `Payment for booking #${bookingId}`,
            roomId: booking.roomId,
        });
        console.log("Payment record created:", payment);
        const redirectURL = `http://localhost:3000/api/payment/complete-payment/${payment.id}?txn_id=${encodeURIComponent(payment.transactionId)}&amt=${payment.amount}&pid=${payment.pidx}&product_code=${process.env.ESEWA_PRODUCT_CODE}`;
        res.redirect(redirectURL);
        // res.status(200).json({
        //     status: "success",
        //     message: "Payment initiated successfully. Please complete payment on eSewa.",
        //     paymentInitiate,
        //     payment
        // })

        // Return the payment initiation details along with payment data and booking info
    }
    catch (err) {
        return res.status(500).json({
            message: err
        })
    }
};

export const completePayment = asyncHandler(async (req, res, next) => {
    const { txn_id, amt, pid,product_code} = req.query;  // Get the `data` from query if it's present
    console.log("reqQuery:", req.query);

    const sanitizedTxnId = txn_id?.trim();
    const sanitizedAmt = amt?.trim();
    const sanitizedPid = pid?.trim();


    if (!sanitizedTxnId || !sanitizedAmt || !sanitizedPid) {
        return next(new AppError("Missing or invalid query parameters", 400));
    }

    try {
        // Pass only the data (Base64 encoded string) to verifyEsewaPayment
        const paymentInfo = await verifyEsewaPayment(req.query);

        if (!paymentInfo.response) {
            return next(new AppError("Payment verification failed", 400));
        }

        // Proceed with booking update logic...
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
});
