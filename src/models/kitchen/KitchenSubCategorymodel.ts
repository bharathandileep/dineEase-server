import mongoose, { Document, Model, Schema } from "mongoose";

export interface IKitchenSubcategory extends Document {
  subcategoryName: string;
  status: boolean;
  category: mongoose.Schema.Types.ObjectId;
}

const kitchenSubcategorySchema: Schema<IKitchenSubcategory> =
  new Schema<IKitchenSubcategory>(
    {
      subcategoryName: { type: String, required: true, trim: true },
      status: { type: Boolean, default: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KitchenCategory",
        required: true,
      },
    },
    { timestamps: true }
  );

const kitchenSubcategory: Model<IKitchenSubcategory> =
  mongoose.model<IKitchenSubcategory>(
    "KitchenSubcategory",
    kitchenSubcategorySchema
  );

export default kitchenSubcategory;
