import Otp from "../../models/OTPSModel";
import { ERROR_TYPES } from "../constants/errorType";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCodes";
import { CustomError } from "../errors/customError";
import { comparePassword } from "../helpers/generatePasswordHash";

export const validateOtp = async (userCredentials: string, otp: string) => {
  const otpDoc = await Otp.findOne({
    $or: [{ email: userCredentials }, { phone: userCredentials }],
  });
  if (!otpDoc) {
    throw new CustomError(
      "The verification code you entered is incorrect. Please try again.",
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_TYPES.BAD_REQUEST_ERROR,
      false
    );
  }
  if (otpDoc.expiresAt <= new Date()) {
    throw new CustomError(
      "OTP has expired. Please request a new one.",
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_TYPES.INVALID_CREDENTIALS_ERROR,
      false
    );
  }
  if (otpDoc.attempts >= 3) {
    throw new CustomError(
      "Too many invalid attempts.",
      HTTP_STATUS_CODE.TOO_MANY_REQUESTS,
      ERROR_TYPES.RATE_LIMIT_ERROR,
      false
    );
  }
  const isOtpValid = await comparePassword(otp, otpDoc.otp);
  if (isOtpValid) {
    otpDoc.attempts = 0;
    await otpDoc.save();
    return true;
  } else {
    otpDoc.attempts += 1;
    await otpDoc.save();
    throw new CustomError(
      "The verification code you entered is incorrect. Please try again.",
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_TYPES.BAD_REQUEST_ERROR,
      false
    );
  }
};
