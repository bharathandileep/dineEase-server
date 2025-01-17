import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../services/firebase";
import { CustomError } from "../lib/errors/customError";
import { ERROR_TYPES } from "../lib/constants/errorType";
import { HTTP_STATUS_CODE } from "../lib/constants/httpStatusCodes";
import { sendErrorResponse } from "../lib/helpers/responseHelper";

/**
 * This file contains middleware for verifying Firebase Authenticaiton tokens.
*/


export const verifyFirebaseToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    throw new CustomError(
      "Authorization token not provided",
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_TYPES.BAD_REQUEST_ERROR,
      false
    );
  }
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.body.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_TYPES.AUTHENTICATION_ERROR
    );
  }
};
