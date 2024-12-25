import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoomById, updateRoom } from '../controller/RoomController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router=express.Router();
router.route('/').get(getAllRoom);
router.use(protectedRoutes);
router.route('/').post(createRoom)
router.route('/:id').patch(updateRoom).get(getRoomById).delete(deleteRoom)
export default router;
