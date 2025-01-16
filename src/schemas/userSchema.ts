import mongoose, { Document, Schema, model } from 'mongoose';
 
// Define an interface for the User document
export interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  phone_number: string;
  profile_photo?: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
 
 
export const UserSchema: Schema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, unique: true, required: true },
    profile_photo: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);