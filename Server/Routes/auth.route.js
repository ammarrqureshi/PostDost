import express from 'express';
import {
  register,
  login,
  forgotPassword,
  verifyOTP,
  logout,
} from '../Controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/signup', register);
authRoutes.post('/login', login);
authRoutes.post('/forgotpassword', forgotPassword);
authRoutes.post('/verifyOTP', verifyOTP);
authRoutes.post('/logout', logout);

export default authRoutes;
