import express from "express";
import { getUsersWithRooms } from "../controllers/userController.js";
import { restrictTo } from "../middleware/restriction.js";
import { protectedRoutes } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectedRoutes, restrictTo("student"), getUsersWithRooms);

export default router;
