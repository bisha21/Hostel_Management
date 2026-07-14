import type { NextFunction, Request, Response } from "express";
import { Booking, Payment, Room } from "../models/index.js";
import { AppError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { initializeKhaltiPayment, verifyKhaltiPayment } from "../services/khaltiService.js";
import type { CashPaymentInput, KhaltiCompleteQuery } from "../schemas/payment.schema.js";
import type { IdParam, PaymentBookingIdParam } from "../schemas/common.schema.js";

export const initializeKhaltiPaymentHandler = asyncHandler(
  async (req: Request<PaymentBookingIdParam>, res: Response, next: NextFunction) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      next(new AppError("Booking not found", 404));
      return;
    }

    if (booking.status === "confirmed") {
      res.status(400).json({
        status: "fail",
        message: "Payment has already been completed for this booking.",
      });
      return;
    }

    const paymentInitiate = await initializeKhaltiPayment({
      amount: booking.total_amount * 100,
      purchase_order_id: String(booking.id),
      purchase_order_name: `Booking #${bookingId}`,
      return_url: "http://localhost:5173/student/payment-success",
      website_url: "https://dev.khalti.com/api/v2/",
    });

    if (!paymentInitiate.pidx || !paymentInitiate.payment_url) {
      next(
        new AppError("Failed to initiate payment. Missing payment pidx or payment_url field.", 400),
      );
      return;
    }

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
      payment_url: paymentInitiate.payment_url,
      payment,
    });
  },
);

export const completeKhaltiPayment = asyncHandler(
  async (
    req: Request<object, unknown, unknown, KhaltiCompleteQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const { transaction_id, pidx } = req.query;

    console.log("🔍 Verifying Khalti payment for pidx:", pidx);
    const paymentInfo = await verifyKhaltiPayment({ pidx });

    if (paymentInfo.status !== "Completed") {
      console.error("Payment verification failed from Khalti:", paymentInfo);
      next(new AppError("Payment verification failed", 400));
      return;
    }

    const payment = await Payment.findOne({ where: { pidx } });
    if (!payment) {
      console.error("No matching payment record found for pidx:", pidx);
      next(new AppError("Payment record not found", 404));
      return;
    }

    const booking = await Booking.findOne({ where: { roomId: payment.roomId } });
    if (!booking) {
      console.error("No active booking found for room ID:", payment.roomId);
      next(new AppError("No active booking found for this room", 404));
      return;
    }

    // Khalti's redirect always includes transaction_id alongside pidx on success.
    await payment.update({ status: "success", transactionId: transaction_id });
    await booking.update({ status: "confirmed", paymentStatus: "confirmed" });

    console.log("✅ Payment verified and booking confirmed!");
    res.status(200).json({
      status: "success",
      message: "Payment verified and booking confirmed.",
    });
  },
);

export const getAllPayment = asyncHandler(async (_req: Request, res: Response, next: NextFunction) => {
  const payment = await Payment.findAll();
  if (payment.length === 0) {
    next(new NotFoundError("Payment not found"));
    return;
  }
  res.status(200).json({
    sucess: true,
    data: payment,
  });
});

export const deletePayment = asyncHandler(
  async (req: Request<IdParam>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      next(new NotFoundError("No payment found"));
      return;
    }
    await payment.destroy();
    res.status(200).json({
      sucess: true,
      message: "Payment deleted successfully",
    });
  },
);

export const processCashPayment = asyncHandler(
  async (req: Request<object, unknown, CashPaymentInput>, res: Response, next: NextFunction) => {
    const { purpose, transactionId, amount, roomName } = req.body;

    const room = await Room.findOne({ where: { RoomNumber: roomName } });
    if (!room) {
      next(new AppError("Room not found", 404));
      return;
    }

    const booking = await Booking.findOne({
      where: { roomId: room.id },
      order: [["createdAt", "DESC"]],
    });
    if (!booking) {
      next(new AppError("No active booking found for this room", 404));
      return;
    }

    if (booking.status === "confirmed") {
      res.status(400).json({
        status: "fail",
        message: "Payment has already been completed for this booking.",
      });
      return;
    }

    const payment = await Payment.create({
      transactionId: `cash-${transactionId}`,
      amount: amount ?? booking.total_amount,
      paymentGateway: "cash",
      status: "success",
      description: `Cash payment for booking #${booking.id}`,
      roomId: booking.roomId,
      purpose,
    });

    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({
      status: "success",
      message: "Cash payment recorded successfully.",
      payment,
    });
  },
);
