import express from 'express';
import { completePayment, initializeEsewaPayment } from '../controller/paymentController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router = express.Router();
router.use(protectedRoutes)
router.post('/:bookingId',initializeEsewaPayment)
router.get("/complete-payment/:paymentId", completePayment);

export default router;
