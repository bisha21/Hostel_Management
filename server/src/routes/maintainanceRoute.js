import express from 'express';
import { restrictTo } from '../middleware/restriction.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { creatMaintainance, deleteMaintainance, getMaintainance, getMaintainanceById, updateMaintainance } from '../controller/maintainanceController.js';
const router= express.Router();

router.use(protectedRoutes)
router.route('/').post(creatMaintainance).get(getMaintainance);

router.route('/:id/').get(getMaintainanceById).patch(restrictTo("student") ,updateMaintainance).delete(restrictTo("student") ,deleteMaintainance);
// router.route('/:messId/reviews').get(getMessReviewById)

export default router;
