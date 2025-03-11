import express from 'express';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { completeKhaltiPayment, deletePayment, getAllPayment, initializeKhaltiPaymentHandler, processCashPayment } from '../controller/paymentController.js';
const router = express.Router();
// router.use(protectedRoutes)
router.post('/:bookingId', initializeKhaltiPaymentHandler);
router.get("/complete-payment", completeKhaltiPayment);
router.get('/', getAllPayment);
router.delete('/:id', deletePayment);
router.post('/',processCashPayment);

export default router;
