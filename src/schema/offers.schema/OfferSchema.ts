import mongoose, { Schema, Document, Model } from 'mongoose';


export interface Ioffer extends Document {
  kitchen_id: mongoose.Types.ObjectId; // Reference to the Kitchen model
  name: string;
  description: string;
  discount_percentage: number; 
  discount_amount: number; 
  start_date: Date; 
  end_date: Date;
  status: boolean; 
  created_at: Date;
  updated_at: Date;
}

// Define the Promotion schema
export const OfferSchema: Schema<Ioffer> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen', // Reference to the Kitchen model
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    discount_percentage: { type: Number, required: true },
    discount_amount: { type: Number, default: 0 }, // Optional
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: Boolean, default: true }, // Active or inactive promotion
  },
  { timestamps: true }
);


