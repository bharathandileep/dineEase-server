

import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IPartyHosting extends Document {
  kitchen_id: mongoose.Types.ObjectId; 
  venue: string;
  date: Date; 
  time: string;
  amount: number;
  host_name: string; 
  host_number: string; 
  food_items: string[]; 
  image_or_poster: string; 
  payment_ref: mongoose.Types.ObjectId; 
  is_deleted: boolean; 
  created_at: Date;
  updated_at: Date; 
}


export const PartyHostingSchema: Schema<IPartyHosting> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true
    },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    amount: { type: Number, required: true },
    host_name: { type: String, required: true },
    host_number: { type: String, required: true },
    food_items: { type: [String], required: true },
    image_or_poster: { type: String, required: true },
    payment_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment', 
      required: true
    },
    is_deleted: {
      type: Boolean,
      default: false 
    }
  },
  { timestamps: true } 
);


