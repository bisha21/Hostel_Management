import express from 'express';
import { createAdmin, deleteAdmin, getAllAdmin, updateAdmin } from '../controller/adminController.js';
const router= express.Router();
router.route('/').post(createAdmin).get(getAllAdmin);
router.route('/:id').patch(updateAdmin).delete(deleteAdmin);
export default router;
