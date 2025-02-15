import express from 'express';
import { getStudent } from '../controller/userController.js';
const router = express.Router();
import { restrictTo } from '../middleware/restriction.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
router.get('/' , protectedRoutes, restrictTo('student') ,getStudent); 
export default router;