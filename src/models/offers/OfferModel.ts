import mongoose, { Schema, Document, Model } from 'mongoose';
import { OfferSchema} from '../../schema/offers.schema/OfferSchema';

// Define the interface for the Promotion document
export interface IOffer extends Document {
  kitchen_id: mongoose.Types.ObjectId; // Reference to the Kitchen model
  name: string;
  description: string;
  discount_percentage: number; // Discount percentage (e.g., 20%)
  discount_amount: number; // Optional: Discount in amount (e.g., $10 off)
  start_date: Date; // Promotion start date
  end_date: Date; // Promotion end date
  status: boolean; // Active or inactive promotion
  created_at: Date;
  updated_at: Date;
}


// Create and export the Promotion model
const Offer: Model<IOffer> = mongoose.model<IOffer>('Offer', OfferSchema);
export default Offer;
