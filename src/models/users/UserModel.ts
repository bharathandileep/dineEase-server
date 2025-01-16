import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IUser extends Document, CommonDBInterface {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_photo?: string;
  date_of_birth: Date;
  gender: "Male" | "Female" | "Other";
}
export const UserSchema: Schema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, unique: true, required: true },
    profile_photo: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
