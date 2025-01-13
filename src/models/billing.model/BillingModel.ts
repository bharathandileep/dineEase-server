import mongoose, { Document, Model } from 'mongoose';
import { BillingSchema } from '../../schema/billing.schema/Billing.schema';

export interface IBilling extends Document {
  order_id: mongoose.Types.ObjectId;   // Reference to the Order schema
  billing_date: Date;                   // Date and time of the billing
  created_at: Date;                     // Timestamp when the billing was created
  updated_at: Date;                     // Timestamp when the billing was last updated
}
 const Billing : Model<IBilling> = mongoose.model<IBilling>('Billing',BillingSchema)
 export default Billing;