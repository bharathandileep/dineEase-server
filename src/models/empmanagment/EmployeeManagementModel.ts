import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IEmployeeManagement extends Document, CommonDBInterface {
  entity_id: mongoose.Types.ObjectId;
  employee_id: mongoose.Types.ObjectId;
  designation: mongoose.Types.ObjectId;
  entity_type: String;
  username: string;
  email: string;
  phone_number: string;
  address: mongoose.Types.ObjectId;
  role: string;
  employee_status: string;
  aadhar_number: string;
  pan_number: string;
  profile_picture: string;
}
export const EmployeeManagementSchema: Schema = new Schema<IEmployeeManagement>(
  {
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "entity_type",
    },
    entity_type: {
      type: String,
      required: true,
      enum: ["Kitchen", "Organization", "admin"],
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "designation",
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",

    },
    role: { type: String},
    employee_status: { type: String, required: true },
    aadhar_number: { type: String, required: true },
    pan_number: { type: String, required: true },
    profile_picture: { type: String, default: null },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EmployeeManagement: Model<IEmployeeManagement> =
  mongoose.model<IEmployeeManagement>(
    "EmployeeManagement",
    EmployeeManagementSchema
  );
export default EmployeeManagement;
