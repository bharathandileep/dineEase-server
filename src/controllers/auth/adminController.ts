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
import { generateAndEmailForgotOtp } from "../../lib/utils/generateAndEmailOtp";
import { validateForgotOtp, validateOtp } from "../../lib/utils/otpValidator";


export const handleRegisterAdmin = async (req: Request, res: Response) => {
  try {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !password) {
      throw new CustomError(
        "All fields are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new CustomError(
        "Admin already exists",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const hashedPassword = await hashPassword(password);
    const newAdmin = new Admin({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    sendSuccessResponse(
      res,
      "Admin registered successfully",
      null,
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

export const handleAdminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError(
        "user name and password are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const admin = await Admin.findOne({ username });
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
    sendSuccessResponse(
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
export const generateForgotPassOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    let admin = await Admin.findOne({ email });
    if (!admin) {
      throw new CustomError(
        "Email not registered.Please enter a valid email address.",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }
    const result = await generateAndEmailForgotOtp(admin.email, admin.fullName);
    if (!result.success) {
      throw new CustomError(
        `Failed to send OTP to the email address. Please try again later.`,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_TYPES.SERVER_ERROR,
        false
      );
    }
    return sendSuccessResponse(
      res,
      "Verification code sent successfully to your email address.",
      { email },
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
export const handleForgotPasswordVerification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, otp } = req.body;
    let admin = await Admin.findOne({ email });
    if (!admin) {
      throw new CustomError(
        "Email not registered. Please enter a valid email address.",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    // Assuming validateOtp will return the admin details if the OTP is valid
    const otpVerificationResult = await validateForgotOtp(email, otp);
    if (!otpVerificationResult) {
      throw new CustomError(
        "Invalid OTP. Please try again.",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    // Generate a new JWT token with a 2-minute expiration
    const payload = { id: admin._id, email: admin.email, role: admin.role };
    const token = generateJWTToken(
      accessTokenSecret,
      payload,
      '2m'  // Token expires in 2 minutes
    );

    // Store the token in the admin document
    admin.authToken = token;
    await admin.save();

    return sendSuccessResponse(
      res,
      "OTP successfully verified. You can now reset your password.",
      { token },
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

export const handleUpdatePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, newPassword } = req.body;
    
    // Validate the new password (optional: add password strength validation)
    if (newPassword.length < 6) {
      throw new CustomError(
        "Password must be at least 6 characters long.",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }
    const hashedPassword = await hashPassword(newPassword);
    let admin = await Admin.findOne({ email });
    if (!admin) {
      throw new CustomError(
        "Email not registered. Please enter a valid email address.",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    // Update the admin's password
    admin.password = hashedPassword;
    await admin.save();

    // Generate a new JWT token with a 2-minute expiration
    const payload = { id: admin._id, email: admin.email, role: admin.role };
    const token = generateJWTToken(
      accessTokenSecret,
      payload,
      '2m'  // Token expires in 2 minutes
    );

    // Store the new token in the authToken field
    admin.authToken = token;
    await admin.save();

    return sendSuccessResponse(
      res,
      "Your password has been updated successfully.",
      { token },
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
