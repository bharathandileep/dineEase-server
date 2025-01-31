import { mailId, mailPassword } from "../../config/environment";
import nodemailer from "nodemailer";
import { generateOtpEmailHtml } from "../views/otpEmailTemplate";
import { generateOtp } from "../helpers/generateOtp";
import { CustomError } from "../errors/customError";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCodes";
import { ERROR_TYPES } from "../constants/errorType";
import { hashPassword } from "../helpers/generatePasswordHash";
import Otp from "../../models/users/OTPSModel";

export const generateAndEmailOtp = async (email: string, fullName: string) => {
  const generatedOTP = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const mailOptions = {
    from: mailId,
    to: email,
    subject: "Your Account Verification Code - Dineeas",
    text: `Your OTP is: ${generatedOTP}`,
    html: generateOtpEmailHtml(generatedOTP),
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailId,
      pass: mailPassword,
    },
  });

  try {
    const hashedOtp = await hashPassword(generatedOTP);
    await Otp.findOneAndUpdate(
      { email },
      { fullName, otp: hashedOtp, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};
