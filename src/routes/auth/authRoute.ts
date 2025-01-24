import express from "express";
import { apiConfig } from "../../config/endpoint ";
import { verifyFirebaseToken } from "../../middleware/verifyFirebaseToken";
import {
  handleAuthenticateOtp,
  handleGoogleAuth,
  handleOtpGeneration,
} from "../../controllers/auth/auth.controller";

const router = express.Router();

router.post(`${apiConfig.auth.google}`, verifyFirebaseToken, handleGoogleAuth);
router.post(`${apiConfig.auth.sendOtp}`, handleOtpGeneration);
router.post(`${apiConfig.auth.verifyOtp}`, handleAuthenticateOtp);

export default router;
