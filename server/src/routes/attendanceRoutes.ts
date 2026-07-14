import express from "express";
import {
  createAttendance,
  getAllUserAttendance,
  getAttendanceByUserId,
  updateApprovalStatus,
} from "../controllers/attendanceController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { restrictTo } from "../middleware/restriction.js";
import { validateBody, validateQuery } from "../validators/validateRequest.js";
import {
  attendanceQuerySchema,
  createAttendanceSchema,
  updateApprovalStatusSchema,
} from "../schemas/attendance.schema.js";

const router = express.Router();

router.use(protectedRoutes);

router.post("/", protectedRoutes, validateBody(createAttendanceSchema), createAttendance);
router.get("/me", protectedRoutes, getAttendanceByUserId);

router.get("/", restrictTo("student"), validateQuery(attendanceQuerySchema), getAllUserAttendance);
router.patch(
  "/approve",
  restrictTo("student"),
  validateBody(updateApprovalStatusSchema),
  updateApprovalStatus,
);

export default router;
