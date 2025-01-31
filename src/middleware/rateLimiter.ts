import rateLimit from 'express-rate-limit';

// Define rate limit settings

export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5, 
  message: {
    success: false,
    message: "Too many OTP requests from this IP, please try again after 10 minutes.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});
