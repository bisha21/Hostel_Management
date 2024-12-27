import express from 'express';
import { createFeedback } from '../controller/feedbackController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/restriction.js';
const router= express.Router();


router.route('/:id').post( protectedRoutes,restrictTo('admin') ,createFeedback);
export default router;
