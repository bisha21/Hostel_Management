import express from "express";
import { protectedRoutes } from "../middleware/protectRoute.js";
import {
  createNotification,
  createNotificationForAll,
  getAllNotification,
  getMyNotifications,
} from "../controllers/notificationController.js";
import { validateBody } from "../validators/validateRequest.js";
import {
  createNotificationForAllSchema,
  createNotificationSchema,
} from "../schemas/notification.schema.js";

const router = express.Router();

router.post("/", validateBody(createNotificationSchema), createNotification);
router.get("/", getAllNotification);
router.post("/all", validateBody(createNotificationForAllSchema), createNotificationForAll);
router.get("/own", protectedRoutes, getMyNotifications);

export default router;
