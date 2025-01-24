import mongoose, { Document, Model, Schema } from "mongoose";
// Create the OTP model
export interface IOtp extends Document {
  email: string;
  fullName: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
}

const otpSchema: Schema<IOtp> = new Schema<IOtp>(
  {
    email: { type: String, unique: true },
    fullName: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Otp: Model<IOtp> = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
