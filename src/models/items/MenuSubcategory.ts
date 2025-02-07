import mongoose, { Document, Model, Schema } from "mongoose";


export interface IMenuSubcategory extends Document {
  subcategoryName: string;
  status: boolean;
  category: mongoose.Schema.Types.ObjectId;
}

const menuSubcategorySchema: Schema<IMenuSubcategory> =
  new Schema<IMenuSubcategory>(
    {
      subcategoryName: { type: String, required: true, trim: true },
      status: { type: Boolean, default: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory",
        required: true,
      },
    },
    { timestamps: true }
  );

const MenuSubcategory: Model<IMenuSubcategory> =
  mongoose.model<IMenuSubcategory>("MenuSubcategory", menuSubcategorySchema);

export default MenuSubcategory;
