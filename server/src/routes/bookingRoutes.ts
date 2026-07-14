import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookings,
  updateBooking,
} from "../controllers/bookingController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { validateBody, validateParams } from "../validators/validateRequest.js";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema.js";
import { bookingIdParamSchema, roomIdParamSchema } from "../schemas/common.schema.js";
import { asRouteHandler } from "../utils/asRouteHandler.js";

const router = express.Router({ mergeParams: true });

router.use(protectedRoutes);
router.get("/all", getBookings);
router.post(
  "/",
  validateParams(roomIdParamSchema),
  validateBody(createBookingSchema),
  asRouteHandler(createBooking),
);
router
  .route("/:id")
  .get(validateParams(bookingIdParamSchema), asRouteHandler(getAllBookings))
  .patch(
    validateParams(bookingIdParamSchema),
    validateBody(updateBookingSchema),
    asRouteHandler(updateBooking),
  );

export default router;
