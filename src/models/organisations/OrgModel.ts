import mongoose, { Schema, Document, Model } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IOrganization extends Document, CommonDBInterface {
  user_id: mongoose.Types.ObjectId;
  address_id: mongoose.Types.ObjectId;
  name: string;
  register_number: string;
  location: string;
  contact_number: string;
  email: string;
  no_of_employees: number;
}

export const OrganizationSchema: Schema<IOrganization> =
  new Schema<IOrganization>(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      address_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Address",
          required: true,
        },
      ],
      name: {
        type: String,
        required: true,
      },
      register_number: {
        type: String,
        required: true,
        unique: true,
      },
      location: {
        type: String,
        required: true,
      },
      contact_number: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      no_of_employees: {
        type: Number,
        required: true,
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

const Organization: Model<IOrganization> = mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);
export default Organization;
