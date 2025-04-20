import express from 'express';
import { createComplaint, getAllComplaints, getComplaintbyRoomID, updateComplaints } from '../controller/complaintController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/restriction.js';
const router = express.Router({ mergeParams: true })
router.use(protectedRoutes);
router.route('/:roomId').get(getComplaintbyRoomID);
router.route('/').get(getAllComplaints);
router.route('/:roomId').post(createComplaint);
router.route('/status/:complaintId').patch(restrictTo("student"),updateComplaints);
export default router;

