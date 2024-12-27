import express from 'express';
import { creatMeal, deleteMeal, getMeal,  getMealById,  getMessReviewById,  updateMeal } from '../controller/messController.js';
const router= express.Router();

router.route('/').post(creatMeal).get(getMeal);
router.route('/:id/').get(getMealById).patch(updateMeal).delete(deleteMeal);
router.route('/:messId/reviews').get(getMessReviewById)

export default router;
