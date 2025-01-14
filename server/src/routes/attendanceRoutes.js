import express from 'express';
import { createAttendance, getAllUserAttendance, getAttendanceByUserId } from '../controller/attedanceController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/restriction.js';
const router= express.Router();

router.post('/',protectedRoutes,createAttendance);
router.get('/me',protectedRoutes,getAttendanceByUserId);
router.get('/',protectedRoutes, restrictTo('student') ,getAllUserAttendance);
export default router;