import express from "express";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { generateReport, getReportbasedonUser } from "../controllers/reportController.js";
import { validateBody } from "../validators/validateRequest.js";
import { createReportSchema } from "../schemas/report.schema.js";

const router = express.Router();

router.use(protectedRoutes);
router.post("/", validateBody(createReportSchema), generateReport);
router.get("/", getReportbasedonUser);

export default router;
