import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoomById, updateRoom } from '../controller/RoomController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import bookingRoute from './bookingRoutes.js';
import complaintRoute from './complaintRoutes.js';
import { restrictTo } from '../middleware/restriction.js';
const router=express.Router({mergeParams:true});
router.use('/:roomId/booking',bookingRoute)
router.use('/:roomId/complaint',complaintRoute)
router.route('/').get(getAllRoom);
router.use(protectedRoutes);
router.route('/').post(createRoom)
router.route('/:id').patch( restrictTo("student"), updateRoom).get(getRoomById).delete( restrictTo("student"),deleteRoom)
export default router;
