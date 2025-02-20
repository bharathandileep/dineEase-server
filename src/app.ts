import Express, { Application, NextFunction } from "express";
import { errorHandler } from "./middleware/globelErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

import { apiConfig } from "./config/endpoint ";
import { CustomError } from "./lib/errors/customError";
import { HTTP_STATUS_CODE } from "./lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "./lib/constants/errorType";
import { sendSuccessResponse } from "./lib/helpers/responseHelper";

import authRoute from "./routes/AuthRoute";
import kitchensRoute from "./routes/kitchen/kitchensRoutes";
import organizationRoute from "./routes/organization/organizationRoute";
import menuCategoryRoutes from "./routes/kitchen/categoryRoutes";
import menuSubCategoryRoutes from "./routes/kitchen/subcategoryRoutes";
import designationRoutes from "./routes/designation/designationRoutes"
import EmployeeManagementRoutes from "./routes/empmanagment/EmployeeManagementRoutes";
import OrgEmployeeManagementRoutes from "./routes/empmanagment/OrgEmployeeManagementRoutes";
import menuitemsRoutes from "./routes/menuitems/menuitemsRoutes"
import addressDetailsRoutes from "./routes/addressdetails/addressDetailsRoutes"
export const app: Application = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(`${apiConfig.baseAPIUrl}/auth`, authRoute);
app.use(`${apiConfig.baseAPIUrl}/kitchens`, kitchensRoute);
app.use(`${apiConfig.baseAPIUrl}/menu-category`, menuCategoryRoutes);
app.use(`${apiConfig.baseAPIUrl}/sub-menu-category`, menuSubCategoryRoutes);
app.use(`${apiConfig.baseAPIUrl}/organization`, organizationRoute);
app.use(`${apiConfig.baseAPIUrl}/designation`, designationRoutes);
app.use(`${apiConfig.baseAPIUrl}/employee`, EmployeeManagementRoutes);
app.use(`${apiConfig.baseAPIUrl}/menu-items`,menuitemsRoutes)
app.use(`${apiConfig.baseAPIUrl}/orgemployee`,OrgEmployeeManagementRoutes)
app.use(`${apiConfig.baseAPIUrl}/addressDetails`,addressDetailsRoutes)


// Health check route
app.get(`${apiConfig.baseAPIUrl}/health`, (req, res) => {
  sendSuccessResponse(
    res,
    "The server is up and running. All systems are operational."
  );
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
