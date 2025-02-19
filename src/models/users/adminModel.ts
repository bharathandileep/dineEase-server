import mongoose, { Model, Schema, Document } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IAdmin extends Document, CommonDBInterface {
  fullName: string;
  username: string;
  email: string;
  profile_photo?: string;
  password: string;
  role: string;

}

export const AdminSchema: Schema = new Schema<IAdmin>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    profile_photo: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, default: "Admin" },
// Add this field to store token
  },
  { timestamps: true }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
