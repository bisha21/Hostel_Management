import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintbyRoomID,
  updateComplaints,
} from "../controllers/complaintController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { restrictTo } from "../middleware/restriction.js";
import { validateBody, validateParams } from "../validators/validateRequest.js";
import { createComplaintSchema, updateComplaintSchema } from "../schemas/complaint.schema.js";
import { complaintIdParamSchema, roomIdParamSchema } from "../schemas/common.schema.js";
import { asRouteHandler } from "../utils/asRouteHandler.js";

const router = express.Router({ mergeParams: true });

router.use(protectedRoutes);
router.route("/:roomId").get(validateParams(roomIdParamSchema), asRouteHandler(getComplaintbyRoomID));
router.route("/").get(getAllComplaints);
router
  .route("/:roomId")
  .post(
    validateParams(roomIdParamSchema),
    validateBody(createComplaintSchema),
    asRouteHandler(createComplaint),
  );
router
  .route("/status/:complaintId")
  .patch(
    restrictTo("student"),
    validateParams(complaintIdParamSchema),
    validateBody(updateComplaintSchema),
    asRouteHandler(updateComplaints),
  );

export default router;
