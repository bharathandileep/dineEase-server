import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMenuCategory extends Document {
  category: string;
  status: boolean;
}

const menuCategorySchema: Schema<IMenuCategory> = new Schema<IMenuCategory>(
  {
    category: { type: String, required: true, unique: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MenuCategory: Model<IMenuCategory> = mongoose.model<IMenuCategory>(
  "MenuCategory",
  menuCategorySchema
);

export default MenuCategory;
