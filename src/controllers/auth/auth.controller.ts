import { Request, Response } from "express";
import { CustomError } from "../../lib/errors/customError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { generateOtp } from "../../lib/helpers/generateOtp";
import Otp from "../../models/users/OTPSModel";
import { generateAndEmailOtp } from "../../lib/utils/generateAndEmailOtp";
import { validateOtp } from "../../lib/utils/otpValidator";
import { hashPassword } from "../../lib/helpers/generatePasswordHash";
import User from "../../models/users/UserModel";

export const handleGoogleAuth = async (
  req: Request,
  res: Response
): Promise<any> => {
  try { 
    const { email, name, picture } = req.body.user;
    let user = await User.findOne({ email });
    if (user) {
      user.profile_photo = picture;
      await user.save();
      return sendSuccessResponse(
        res,
        "User logged in successfully.",
        user,
        HTTP_STATUS_CODE.OK
      );
    }
    user = new User({
      fullName: name,
      email,
      profile_photo: picture,
    });
    await user.save();
    return sendSuccessResponse(
      res,
      "User registered successfully.",
      user,
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

export const handleOtpGeneration = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, fullName } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new CustomError(
        `This email address is already registered. Please try signing in instead.`,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    const generatedOTP = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const result = await generateAndEmailOtp(email, generatedOTP);
    if (!result.success) {
      throw new CustomError(
        `Failed to send OTP to the email address. Please try again later.`,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        ERROR_TYPES.SERVER_ERROR,
        false
      );
    }

    const hashedOtp = await hashPassword(generatedOTP);
    await Otp.findOneAndUpdate(
      { email },
      { fullName, otp: hashedOtp, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );
    
    //save user details
    user = new User({
      fullName,
      email,
    });

    await user.save();
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

 export const handleAuthenticateOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userCredentials, OTP } = req.body;
    //validete otp
    await validateOtp(userCredentials, OTP);
    return sendSuccessResponse(
      res,
      "Great! Your email address has been successfully verified.",
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





export const handlePhoneRegistration = (req: Request, res: Response) => {};
