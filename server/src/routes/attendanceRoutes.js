import express from 'express';
import { 
  createAttendance, 
  getAllUserAttendance, 
  getAttendanceByUserId,
  updateApprovalStatus 
} from '../controller/attedanceController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/restriction.js';

const router = express.Router();

// Base routes with authentication
router.use(protectedRoutes);

// Student routes
router.post('/',protectedRoutes, createAttendance);
router.get('/me',protectedRoutes, getAttendanceByUserId);

// Admin routes
router.get('/', restrictTo('student'), getAllUserAttendance);
router.patch('/approve', restrictTo('student'), updateApprovalStatus);

export default router;