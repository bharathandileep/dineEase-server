import mongoose, { Schema, Document, Model } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";
import { boolean } from "joi";

export interface IMenu extends Document, CommonDBInterface {
  kitchen_id: mongoose.Types.ObjectId;
  items_id: {
    item_id: mongoose.Types.ObjectId;
    item_name: string;
    item_price?: string;
    custom_image?: string;
    isAvailable: boolean;
    reviews_id: any[];
    description: string;
    ingredients?: string;
  }[];
  menu_image: string;
  // item_type: "vegetarian" | "non-vegetarian" | "vegan" | "mixed";
  delivery_time: number;
  reviews_id: mongoose.Types.ObjectId[];
  is_deleted: boolean;
}

export const MenuSchema: Schema<IMenu> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },
    items_id: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        item_name: {
          type: String,
        },
        item_price: {
          type: String,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
        description: {
          type: String,
        },
        ingredients: {
          type: [String],
          default: [],
        },
        custom_image: {
          type: String,
        },
        reviews_id: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
          },
        ],
      },
    ],
    menu_image: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Menu: Model<IMenu> = mongoose.model<IMenu>("Menu", MenuSchema);
export default Menu;
