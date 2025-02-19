import { mailId, mailPassword } from "../../config/environment";
import nodemailer from "nodemailer";
import { generateOtpEmailHtml } from "../views/otpEmailTemplate";
import { generateOtp } from "../helpers/generateOtp";
import { CustomError } from "../errors/customError";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCodes";
import { ERROR_TYPES } from "../constants/errorType";
import { hashPassword } from "../helpers/generatePasswordHash";
import Otp from "../../models/users/OTPSModel";
import { sendEmail } from "../../config/mailConfig";
import { forgotPassHtml } from "../views/forgotPassTemplate";
import PasswordReset from "../../models/users/forgotOtpModel";



export const generateAndEmailOtp = async (email: string, fullName: string) => {
  const generatedOTP = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const subject = "Your Account Verification Code - Dineeas";
  const text = `Your OTP is: ${generatedOTP}`;
  const html = generateOtpEmailHtml(generatedOTP);
 
  const isMailSend = await sendEmail({ email, subject, html, text });
  try {
    const hashedOtp = await hashPassword(generatedOTP);
    await Otp.findOneAndUpdate(
      { email },
      { fullName, otp: hashedOtp, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );
    return isMailSend;
  } catch (error) {
    return { success: false, error };
  }
};

export const generateAndEmailForgotOtp = async (email: string, fullName: string) => {
  const generatedOTP = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const subject = "Your Account Verification Code - Dineeas";
  const text = `Your OTP is: ${generatedOTP}`;
  const html = forgotPassHtml(generatedOTP);
  console.log(email,fullName)
  const isMailSend = await sendEmail({ email, subject, html, text });
  try {
    const hashedOtp = await hashPassword(generatedOTP);
    await PasswordReset.findOneAndUpdate(
      { email },
      { fullName, otp: hashedOtp, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );
    return isMailSend;
  } catch (error) {
    return { success: false, error };
  }
};




export const sendEmployeeCreationEmail = async (
  email: string,
  fullName: string,
  designation: string
) => {
  const mailOptions = {
    from: mailId,
    to: email,
    subject: "Welcome to the Organization - Dineeas",
    text: `Dear ${fullName},\n\nYou have been successfully added to the organization as ${designation}.\n\nPlease log in to your account for further details.\n\nBest Regards,\nDineeas Team`,
    html: `<p>Dear <strong>${fullName}</strong>,</p>
           <p>You have been successfully added to the organization as <strong>${designation}</strong>.</p>
           <p>Please log in to your account for further details.</p>
           <p>Best Regards,<br/>Dineeas Team</p>`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailId,
      pass: mailPassword,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};
export const sendResetPasswordEmail = async (email: string, fullName: string) => {
  const generatedOTP = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const mailOptions = {
    from: mailId,
    to: email,
    subject: "Reset Password OTP - Dineeas",
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
