import express from "express";
import {
  handleForgotPassword,
  login,
  logOut,
  OwnDetail,
  registerUser,
  resetPassword,
  updateMe,
  verifyOtp,
} from "../controllers/userController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { singleUpload } from "../middleware/multer.js";
import { validateBody } from "../validators/validateRequest.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../schemas/auth.schema.js";
import { updateProfileSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register", singleUpload, validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), login);
router.post("/forget-password", validateBody(forgotPasswordSchema), handleForgotPassword);
router.patch("/update-profile", protectedRoutes, validateBody(updateProfileSchema), updateMe);
router.post("/verify-otp", validateBody(verifyOtpSchema), verifyOtp);
router.post("/reset-password", validateBody(resetPasswordSchema), resetPassword);
router.get("/logout", logOut);
router.get("/detail", protectedRoutes, OwnDetail);

export default router;
