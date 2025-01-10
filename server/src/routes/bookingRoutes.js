import express from 'express';
import { createBooking, getAllBookings, updateBooking } from '../controller/bookingController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router= express.Router({mergeParams:true});
router.use(protectedRoutes);
router.get('/',createBooking)
router.get('/:id',getAllBookings).patch(updateBooking);
export default router;