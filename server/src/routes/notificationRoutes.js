import express from 'express';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { createNotification } from '../controller/notificationController.js';
const router = express.Router();
router.use(protectedRoutes);
router.post('/',createNotification);
export default router;