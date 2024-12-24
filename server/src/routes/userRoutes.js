import express from 'express';
import { login, logOut, registerUser } from '../controller/userController.js';
const router= express.Router();
router.post('/register',registerUser);
router.post('/login',login);
router.get('/logout',logOut);
export default router;