import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Promotion document
export interface IPromotion extends Document {
  kitchen_id: mongoose.Types.ObjectId; // Reference to the Kitchen model
  name: string;
  banner:string;
  description: string;
  discount_percentage: number; // Discount percentage (e.g., 20%)
  discount_amount: number; // Optional: Discount in amount (e.g., $10 off)
  start_date: Date; // Promotion start date
  end_date: Date; // Promotion end date
  status: boolean; // Active or inactive promotion
  created_at: Date;
  updated_at: Date;
}

export const PromotionSchema: Schema<IPromotion> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen', // Reference to the Kitchen model
      required: true
    },
    name: { type: String, required: true },
    banner: { type: String, required: true },
    description: { type: String, required: true },
    discount_percentage: { type: Number, required: true },
    discount_amount: { type: Number, default: 0 }, // Optional
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: Boolean, default: true }, // Active or inactive promotion
  },
  { timestamps: true }
);

