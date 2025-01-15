import mongoose, { Document, Model } from 'mongoose';
import { BillingSchema } from '../../schema/billing/Billing.schema';

export interface IBilling extends Document {
  order_id: mongoose.Types.ObjectId;   
  billing_date: Date;  
  is_deleted: boolean;                  
   created_at: Date;                     
  updated_at: Date;                     
}
 const Billing : Model<IBilling> = mongoose.model<IBilling>('Billing',BillingSchema)
 export default Billing;