import express from 'express';
import {  getUsersWithRooms } from '../controller/userController.js';
const router = express.Router();
import { restrictTo } from '../middleware/restriction.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
router.get('/' , protectedRoutes, restrictTo('student') ,getUsersWithRooms); 
export default router;