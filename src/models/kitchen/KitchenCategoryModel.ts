import mongoose, { Document, Model, Schema } from "mongoose";

export interface IKitchenCategory extends Document {
  category: string;
  status: boolean;
}

const KitchenCategorySchema: Schema<IKitchenCategory> =
  new Schema<IKitchenCategory>(
    {
      category: { type: String, required: true, unique: true, trim: true },
      status: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

const kitchenCategory: Model<IKitchenCategory> =
  mongoose.model<IKitchenCategory>("KitchenCategory", KitchenCategorySchema);

export default kitchenCategory;
