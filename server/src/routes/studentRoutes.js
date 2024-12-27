import express from 'express';
import { createStudent, deleteStudent, getAllStudent, getStudentById, getVisitorById, updateStudent } from '../controller/studentController.js';
import { createVisitor } from '../controller/visitorController.js';
const router=express.Router();
router.route('/').post(createStudent).get(getAllStudent);
router.route('/:id').patch(updateStudent).get(getStudentById).delete(deleteStudent)
router.route('/:studentId/visitor').post(createVisitor);
router.route('/visitor/:id').get(getVisitorById);

export default router;
