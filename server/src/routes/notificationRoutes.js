import express from 'express';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { createNotification, createNotificationForAll, getAllNotification } from '../controller/notificationController.js';
const router = express.Router();
router.use(protectedRoutes);
router.post('/',createNotification);
router.get('/', getAllNotification);
router.post('/all',createNotificationForAll);
export default router;