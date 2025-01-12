import express from 'express';
import { createComplaint, getComplaintbyRoomID, updateComplaints } from '../controller/complaintController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router= express.Router({mergeParams:true});
router.use(protectedRoutes);
router.route('/').post(createComplaint).get(getComplaintbyRoomID);
router.route('/:roomId').patch(updateComplaints);
export default router;

