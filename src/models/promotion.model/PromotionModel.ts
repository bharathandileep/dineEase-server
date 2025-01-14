import mongoose, { Schema, Document, Model } from 'mongoose';
import { PromotionSchema} from '../../schema/promotion.schema/PromotionSchema';

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


const Promotion: Model<IPromotion> = mongoose.model<IPromotion>('Promotion', PromotionSchema);
export default Promotion;
