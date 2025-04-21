import express from "express";
import { protectedRoutes } from "../middleware/protectRoute.js";
import {
  createNotification,
  createNotificationForAll,
  getAllNotification,
  getMyNotifications,
} from "../controller/notificationController.js";
const router = express.Router();
// router.use(protectedRoutes);
router.post("/", createNotification);
router.get("/", getAllNotification);
router.post("/all", createNotificationForAll);
router.get("/own", protectedRoutes, getMyNotifications);
export default router;
