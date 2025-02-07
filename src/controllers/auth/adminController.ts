import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import Admin from "../../models/users/adminModel";
import {
  comparePassword,
  hashPassword,
} from "../../lib/helpers/generatePasswordHash";
import { appendRefreshTokenCookies } from "../../lib/utils/attachAuthToken";
import { generateJWTToken } from "../../lib/helpers/JWTToken";
import {
  accessTokenExpiration,
  accessTokenSecret,
} from "../../config/environment";
import { CustomError } from "../../lib/errors/customError";

export const handleRegisterAdmin = async (req: Request, res: Response) => {
  try {
    const { fullName, email, userName, password } = req.body;

    if (!fullName || !email || !password) {
      return sendErrorResponse(
        res,
        "All fields are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR
      );
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return sendErrorResponse(
        res,
        "Admin already exists",
        HTTP_STATUS_CODE.BAD_GATEWAY,
        ERROR_TYPES.BAD_GATEWAY_ERROR
      );
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: "Admin registered successfully" });
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};
export const handleAdminLogin = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return sendErrorResponse(
        res,
        "user name and password are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR
      );
    }

    const admin = await Admin.findOne({ userName });
    if (!admin) {
      throw new CustomError(
        `Invalid credential`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      throw new CustomError(
        `Invalid credential`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const payload = { id: admin._id, email: admin.email, role: admin.role };
    appendRefreshTokenCookies(res, payload);
    const accessToken = generateJWTToken(
      accessTokenSecret,
      payload,
      accessTokenExpiration
    );
    return sendSuccessResponse(
      res,
      "User logged in successfully.",
      { token: accessToken },
      HTTP_STATUS_CODE.OK
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};
