import express from 'express';
import { createFeedback } from '../controller/feedbackController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router= express.Router();

router.route('/:id').post( protectedRoutes,createFeedback);
export default router;
