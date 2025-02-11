import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrgCategory extends Document {
  category: string;
  status: boolean;
}

const OrgCategorySchema: Schema<IOrgCategory> = new Schema<IOrgCategory>(
  {
    category: { type: String, required: true, unique: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const OrgCategory: Model<IOrgCategory> = mongoose.model<IOrgCategory>(
  "OrgCategory",
  OrgCategorySchema
);

export default OrgCategory;
