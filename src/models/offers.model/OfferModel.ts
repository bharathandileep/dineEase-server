import mongoose, { Schema, Document, Model } from 'mongoose';
import { OfferSchema} from '../../schema/offers.schema/OfferSchema';


export interface IOffer extends Document {
  kitchen_id: mongoose.Types.ObjectId; 
  name: string;
  description: string;
  discount_percentage: number; 
  discount_amount: number; 
  start_date: Date; 
  end_date: Date; 
  status: boolean; 
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}



const Offer: Model<IOffer> = mongoose.model<IOffer>('Offer', OfferSchema);
export default Offer;
