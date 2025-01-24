export const generateOtpEmailHtml = (generatedOTP: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <tr>
                <td style="padding: 40px 30px; text-align: center; background-color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <img src="https://res.cloudinary.com/dykrwhqxp/image/upload/v1737458109/wd3uot8u28dnocmtau9s.png" alt="Dineeas" style="max-width: 200px; height: auto;">
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 30px;">
                    <h1 style="color: #333333; font-size: 24px; margin: 0; text-align: center;">Verify Your Account</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 30px;">
                    <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0;">Hello,</p>
                    <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-top: 15px;">Thank you for choosing Dineeas. To complete your verification, please use the following One-Time Password (OTP):</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 30px;">
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; text-align: center;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333333;">${generatedOTP}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 30px;">
                    <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0;">This OTP will expire in 5 minutes. Please do not share this code with anyone.</p>
                    <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-top: 15px;">If you didn't request this code, please ignore this email.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};
