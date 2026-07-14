import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoomById,
  updateRoom,
} from "../controllers/roomController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import bookingRoute from "./bookingRoutes.js";
import complaintRoute from "./complaintRoutes.js";
import { restrictTo } from "../middleware/restriction.js";
import { validateBody, validateParams } from "../validators/validateRequest.js";
import { createRoomSchema, updateRoomSchema } from "../schemas/room.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { asRouteHandler } from "../utils/asRouteHandler.js";

const router = express.Router({ mergeParams: true });

router.use("/:roomId/booking", bookingRoute);
router.use("/:roomId/complaint", complaintRoute);
router.route("/:id").get(validateParams(idParamSchema), asRouteHandler(getRoomById));
router.route("/").get(getAllRoom);
router.use(protectedRoutes);
router.route("/").post(validateBody(createRoomSchema), createRoom);
router
  .route("/:id")
  .patch(restrictTo("student"), validateParams(idParamSchema), validateBody(updateRoomSchema), updateRoom)
  .delete(restrictTo("student"), validateParams(idParamSchema), deleteRoom);

export default router;
