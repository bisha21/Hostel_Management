import express from 'express';
import {protectedRoutes} from '../middleware/protectRoute.js'
import { generateReport, getReportbasedonUser } from '../controller/reportController.js';
const router=express.Router();
router.use(protectedRoutes);
router.post('/',generateReport);
router.get('/',getReportbasedonUser);
export default router;
