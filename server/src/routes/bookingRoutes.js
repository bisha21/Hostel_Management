import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookings,
  updateBooking,
} from "../controller/bookingController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
const router = express.Router({ mergeParams: true });
router.use(protectedRoutes);
router.get("/all", getBookings);
router.post("/", createBooking);
router.route("/:id").get(getAllBookings).patch(updateBooking);
export default router;
