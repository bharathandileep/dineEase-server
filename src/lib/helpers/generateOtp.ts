import crypto from 'crypto';

// generate 6 Digit random OTP
export function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
  }