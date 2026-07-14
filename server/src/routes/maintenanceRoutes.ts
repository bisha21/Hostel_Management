import express from "express";
import { restrictTo } from "../middleware/restriction.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import {
  createMaintenance,
  deleteMaintenance,
  getMaintenance,
  getMaintenanceById,
  updateMaintenance,
} from "../controllers/maintenanceController.js";
import { validateBody, validateParams } from "../validators/validateRequest.js";
import { createMaintenanceSchema, updateMaintenanceSchema } from "../schemas/maintenance.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";

const router = express.Router();

router.use(protectedRoutes);
router.route("/").post(validateBody(createMaintenanceSchema), createMaintenance).get(getMaintenance);

router
  .route("/:id/")
  .get(validateParams(idParamSchema), getMaintenanceById)
  .patch(
    restrictTo("student"),
    validateParams(idParamSchema),
    validateBody(updateMaintenanceSchema),
    updateMaintenance,
  )
  .delete(restrictTo("student"), validateParams(idParamSchema), deleteMaintenance);

export default router;
