import express from 'express';
import { creatMeal, deleteMeal, getMeal,  getMealById,  getMessReviewById,  updateMeal } from '../controller/messController.js';
import { restrictTo } from '../middleware/restriction.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router= express.Router();

router.use(protectedRoutes)
router.route('/').post(restrictTo('student'),creatMeal).get(getMeal);

router.route('/:id/').get(getMealById).patch(restrictTo("student") ,updateMeal).delete(restrictTo("student") ,deleteMeal);
router.route('/:messId/reviews').get(getMessReviewById)

export default router;
