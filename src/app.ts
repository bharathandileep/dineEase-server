import Express, { Application, NextFunction } from "express";
import { errorHandler } from "./middleware/globelErrorHandler";
import cors from "cors";
import authRoute from "./routes/auth/authRoute";
import { apiConfig } from "./config/endpoint ";
import { CustomError } from "./lib/errors/customError";
import { HTTP_STATUS_CODE } from "./lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "./lib/constants/errorType";
import { sendSuccessResponse } from "./lib/helpers/responseHelper";
export const app: Application = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());


app.use(`${apiConfig.baseAPIUrl}/auth`, authRoute);


// Health check route
app.get(`${apiConfig.baseAPIUrl}/health`, (req, res) => {
  sendSuccessResponse(res,"The server is up and running. All systems are operational.");
});

// 404 Error handler for all non-existing routes
app.use("*", (req, res, next) => {
  throw new CustomError(
    `The page ${req.originalUrl} you requested does not exist.`, 
    HTTP_STATUS_CODE.NOT_FOUND,
    ERROR_TYPES.BAD_REQUEST_ERROR,
    false
  );
});

app.use(errorHandler);
