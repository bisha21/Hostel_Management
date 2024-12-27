import express from 'express';
import { createVisitor, getAllVisitors, getVisitorById, updateVisitor,deleteVisitorById } from '../controller/visitorController.js';
const router= express.Router();
router.route('/:studentId').post(createVisitor);
router.route('/').get(getAllVisitors);
router.route('/:id').patch(updateVisitor).get(getVisitorById).delete(deleteVisitorById);
export default router;