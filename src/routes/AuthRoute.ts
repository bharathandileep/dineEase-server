import express, { Application } from "express";
import { apiConfig } from "../config/endpoint ";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import {
  handleAuthenticateOtp,
  handleGoogleAuth,
  generateRegistrationOtp,
  generateLoginOtp,
  handleLoginOtpVerification,
} from "../controllers/auth/authController";
import { otpRateLimiter } from "../middleware/rateLimiter";
import { handleAdminLogin, handleRegisterAdmin } from "../controllers/auth/adminController";

const router = express.Router();

router.post(`${apiConfig.auth.google}`, verifyFirebaseToken, handleGoogleAuth);
router.post(
  `${apiConfig.auth.sendOtp}`,
  otpRateLimiter,
  generateRegistrationOtp
);
router.post(`${apiConfig.auth.loginOtp}`, generateLoginOtp);
router.post(`${apiConfig.auth.verifyOtp}`, handleAuthenticateOtp);
router.post(`${apiConfig.auth.verifyLoginOtp}`, handleLoginOtpVerification);
router.post(`${apiConfig.auth.adminRegister}`, handleRegisterAdmin);
router.post(`${apiConfig.auth.adminLogin}`, handleAdminLogin);
export default router;
 