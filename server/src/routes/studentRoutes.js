import express from 'express';
import { createStudent, deleteStudent, getAllStudent, getStudentById, updateStudent } from '../controller/studentController.js';
const router=express.Router();
router.route('/').post(createStudent).get(getAllStudent);
router.route('/:id').patch(updateStudent).get(getStudentById).delete(deleteStudent)
export default router;
