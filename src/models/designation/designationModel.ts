import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDesignation extends Document {
    designation_name: string;
    role_id: number;
    role_name: string;
    created_by: string;
    updated_by: string;
    status: boolean;
}

const DesignationSchema: Schema<IDesignation, Model<IDesignation>> = new Schema<IDesignation, Model<IDesignation>>(
  {
    designation_name: { type: String, required: true, unique: true, trim: true },
    role_id: { type: Number, required: true },
    role_name: { type: String, required: true, trim: true },
    created_by: { type: String, trim: true },
    updated_by: { type: String, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Designation: Model<IDesignation> = mongoose.model<IDesignation>(
  "designation",
  DesignationSchema
);

export default Designation;
