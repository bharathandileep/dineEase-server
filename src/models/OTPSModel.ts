import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  otp: string;
  created_at: Date;
  expires_at: Date;
  is_used: boolean;
}

const OTPSchema: Schema<IOTP> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    is_used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const OTPModel = mongoose.model<IOTP>("OTP", OTPSchema);
