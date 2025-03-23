import express from 'express';
import { handleForgotPassword, login, logOut, registerUser, resetPassword, verifyOtp } from '../controller/userController.js';
const router= express.Router();
router.post('/register',registerUser);
router.post('/login',login);
router.post('/forget-password',handleForgotPassword);
router.post("/verify-otp",verifyOtp)
router.post("/reset-password",resetPassword);
router.get('/logout',logOut);
export default router;