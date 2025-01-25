import express from 'express';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { completeKhaltiPayment, initializeKhaltiPaymentHandler } from '../controller/paymentController.js';
const router = express.Router();
router.use(protectedRoutes)
router.post('/:bookingId',initializeKhaltiPaymentHandler);
router.get("/complete-payment", completeKhaltiPayment);

export default router;
