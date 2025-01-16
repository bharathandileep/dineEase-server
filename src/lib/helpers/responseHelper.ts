// responseHelper.ts
import { Response } from "express";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCodes";

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = HTTP_STATUS_CODE.OK
) => {
  return res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
  });
};

// Error Response
export const sendErrorResponse = (
  res: Response,
  error: Error,
  statusCode: number = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  errorType: string = "ServerError",
  details: string = ""
) => {
  return res.status(statusCode).json({
    status: false,
    message: error.message,
    errorType: errorType,
    details: details,
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
  });
};
