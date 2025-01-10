import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoomById, updateRoom } from '../controller/RoomController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import bookingRoute from './bookingRoutes.js';
const router=express.Router({mergeParams:true});
router.use('/:roomId/booking',bookingRoute)
router.route('/').get(getAllRoom);
router.use(protectedRoutes);
router.route('/').post(createRoom)
router.route('/:id').patch(updateRoom).get(getRoomById).delete(deleteRoom)
export default router;
