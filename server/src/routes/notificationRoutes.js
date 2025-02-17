import express from 'express';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { createNotification, createNotificationForAll } from '../controller/notificationController.js';
const router = express.Router();
router.use(protectedRoutes);
router.post('/',createNotification);
router.post('/all',createNotificationForAll);
export default router;