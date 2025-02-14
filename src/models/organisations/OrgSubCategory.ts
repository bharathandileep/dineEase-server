import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrgSubcategory extends Document {
  subcategoryName: string;
  status: boolean;
  category: mongoose.Schema.Types.ObjectId;
}

const OrgSubcategorySchema: Schema<IOrgSubcategory> =
  new Schema<IOrgSubcategory>(
    {
      subcategoryName: { type: String, required: true, trim: true },
      status: { type: Boolean, default: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrgCategory",
        required: true,
      },
    },
    { timestamps: true }
  );

const OrgSubcategory: Model<IOrgSubcategory> = mongoose.model<IOrgSubcategory>(
  "OrgSubcategory",
  OrgSubcategorySchema
);

export default OrgSubcategory;
