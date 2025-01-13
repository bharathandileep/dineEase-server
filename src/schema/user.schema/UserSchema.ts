import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the User document
export interface IUser extends Document {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_photo?: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}


export const UserSchema: Schema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, unique: true, required: true },
    profile_photo: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

