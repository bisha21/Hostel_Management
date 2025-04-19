import express from 'express';
import { handleForgotPassword, login, logOut, registerUser, resetPassword, updateMe, verifyOtp, userProfileDetails } from '../controller/userController.js';
import { protectedRoutes } from '../middleware/protectRoute.js';
import { singleUpload } from '../middleware/multer.js';
const router= express.Router();
router.post('/register',singleUpload ,registerUser);
router.post('/login',login);
router.post('/forget-password',handleForgotPassword);
router.patch('/update-profile',protectedRoutes,updateMe);
router.post("/verify-otp",verifyOtp)
router.post("/reset-password",resetPassword);
router.get('/logout',logOut);
router.get('/me',userProfileDetails);
export default router;