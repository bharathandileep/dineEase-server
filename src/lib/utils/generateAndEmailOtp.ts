import { mailId, mailPassword } from "../../config/environment";
import nodemailer from "nodemailer";
import { generateOtpEmailHtml } from "../views/otpEmailTemplate";

export const generateAndEmailOtp = async (
  email: string,
  generatedOTP: string
) => {
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
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};
