import express, { Application } from "express"; 
import { apiConfig } from "../../config/endpoint ";
import { verifyFirebaseToken } from "../../middleware/verifyFirebaseToken";
import { handleGoogleAuth } from "../../controllers/auth/auth.controller";

const router = express.Router();

router.post(`${apiConfig.auth.loginGoogle}`,verifyFirebaseToken, handleGoogleAuth );

export default router;
