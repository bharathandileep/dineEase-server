import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IItem extends Document, CommonDBInterface {
  item_name: string;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: mongoose.Schema.Types.ObjectId;
  status: boolean;
  item_image: string;
  item_description: string;
}
export const ItemSchema: Schema = new Schema<IItem>(
  {
    item_name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuSubcategory",
      required: true,
    },
    status: { type: Boolean, required: true, default: true },
    item_image: { type: String, default: null },
    item_description: { type: String, required: true },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Item: Model<IItem> = mongoose.model<IItem>("Item", ItemSchema);
export default Item;
