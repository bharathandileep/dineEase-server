import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IKitchen extends Document, CommonDBInterface {
  kitchen_name: string;
  kitchen_status: string;
  kitchen_owner_name: string;
  address_id: mongoose.Types.ObjectId;
  owner_email: string;
  owner_phone_number: string;
  restaurant_type: string;
  kitchen_type: "Veg" | "Non-Veg";
  kitchen_phone_number: string;
  kitchen_document_verification: boolean;
  opens_at: string;
  closes_at: string;
  working_days: string[];
  kitchen_image: string;
  gst_number: string;
}

export const KitchenSchema: Schema = new Schema<IKitchen>(
  {
    kitchen_name: { type: String, required: true },
    address_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      }
    ],
    kitchen_status: { type: String, required: true },
    kitchen_owner_name: { type: String, required: true },
    owner_email: { type: String, required: true },
    owner_phone_number: { type: String, required: true },
    restaurant_type: { type: String, required: true },
    kitchen_type: {
      type: String,
      required: true,
      enum: ["Veg", "Non-Veg"],
    },
    kitchen_phone_number: { type: String, required: true },
    kitchen_document_verification: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    opens_at: { type: String, required: true },
    closes_at: { type: String, required: true },  
    working_days: { type: [String], required: true },
    kitchen_image: { type: String, required: true },
  },
  { timestamps: true }
);

const Kitchen: Model<IKitchen> = mongoose.model<IKitchen>(
  "Kitchen",
  KitchenSchema
);
export default Kitchen;
