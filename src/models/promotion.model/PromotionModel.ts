import mongoose, { Schema, Document, Model } from 'mongoose';
import { PromotionSchema} from '../../schema/promotion.schema/PromotionSchema';


export interface IPromotion extends Document {
  kitchen_id: mongoose.Types.ObjectId; 
  name: string;
  banner:string;
  description: string;
  discount_percentage: number; 
  discount_amount: number; 
  start_date: Date; 
  end_date: Date;
  is_deleted: boolean;
  status: boolean; 
  created_at: Date;
  updated_at: Date;
}


const Promotion: Model<IPromotion> = mongoose.model<IPromotion>('Promotion', PromotionSchema);
export default Promotion;
