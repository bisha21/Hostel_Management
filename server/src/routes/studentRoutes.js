import express from 'express';
import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent } from '../controller/studentController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
const router=express.Router();


router.route('/').get(getAllStudent);
router.use(protectedRoutes)
router.route('/').post(createStudent)
router.route('/:id').patch(updateStudent).get(getStudentById).delete(deleteStudent)

export default router;
