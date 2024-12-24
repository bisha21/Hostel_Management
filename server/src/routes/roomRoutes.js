import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoomById, updateRoom } from '../controller/RoomController.js';
const router=express.Router();
router.route('/').post(createRoom).get(getAllRoom);
router.route('/:id').patch(updateRoom).get(getRoomById).delete(deleteRoom)
export default router;
