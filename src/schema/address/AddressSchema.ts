import mongoose, { Schema, Document, model } from 'mongoose';

// Define the interface for the Address document
export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  pincode: string;
  district: string;
  state: string;
  address_type: 'home' | 'work' | 'other';
  created_at: Date;
  updated_at: Date;
}

// Define the Address schema
export const AddressSchema: Schema<IAddress> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    address_type: {
      type: String,
      enum: ['home', 'work', 'other'],
      required: true
    }
  },
  { timestamps: true }
);


