import express from "express";
import {
  completeKhaltiPayment,
  deletePayment,
  getAllPayment,
  initializeKhaltiPaymentHandler,
  processCashPayment,
} from "../controllers/paymentController.js";
import { validateBody, validateParams, validateQuery } from "../validators/validateRequest.js";
import { cashPaymentSchema, khaltiCompleteQuerySchema } from "../schemas/payment.schema.js";
import { idParamSchema, paymentBookingIdParamSchema } from "../schemas/common.schema.js";
import { asRouteHandler } from "../utils/asRouteHandler.js";

const router = express.Router();

router.post(
  "/:bookingId",
  validateParams(paymentBookingIdParamSchema),
  asRouteHandler(initializeKhaltiPaymentHandler),
);
router.get("/complete-payment", validateQuery(khaltiCompleteQuerySchema), completeKhaltiPayment);
router.get("/", getAllPayment);
router.delete("/:id", validateParams(idParamSchema), asRouteHandler(deletePayment));
router.post("/", validateBody(cashPaymentSchema), processCashPayment);

export default router;
