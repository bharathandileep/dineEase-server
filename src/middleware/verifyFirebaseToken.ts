import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../services/firebase";
import { CustomError } from "../lib/errors/customError";

import { sendErrorResponse } from "../lib/helpers/responseHelper";
import { ERROR_TYPES } from "../lib/constants/errorType";
import { HTTP_STATUS_CODE } from "../lib/constants/httpStatusCodes";

/**
 *  middleware for verifying Firebase Authenticaiton tokens.
 */
export const verifyFirebaseToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.google_authorization?.split("Bearer ")[1];
    if (!token) {
      throw new CustomError(
        "Authorization token not provided",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.body.user = decodedToken;
    next();
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_TYPES.AUTHENTICATION_ERROR
    );
  }
};
