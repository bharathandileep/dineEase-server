import mongoose, { Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IAdmin extends Document, CommonDBInterface {
  fullName: string;
  userName: string;
  email: string;
  profile_photo?: string;
  password: string;
  role:string
}

export const AdminSchema: Schema = new Schema<IAdmin>(
  {
    fullName: { type: String, required: true },
    userName:{ type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    profile_photo: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },
    password: { type: String, require: true },
    role:{type:String,default:"Admin"}
  },
  { timestamps: true }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
