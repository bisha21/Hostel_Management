import express from 'express';
import { createStudent, deleteStudent, getAllStudent, getStudentById, getVisitorById, updateStudent } from '../controller/studentController.js';
import { createVisitor } from '../controller/visitorController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router=express.Router();


router.route('/').get(getAllStudent);
router.use(protectedRoutes)
router.route('/').post(createStudent)
router.route('/:id').patch(updateStudent).get(getStudentById).delete(deleteStudent)
router.route('/:studentId/visitor').post(createVisitor);
router.route('/visitor/:id').get(getVisitorById);

export default router;
