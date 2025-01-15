import mongoose, { Document, Model } from 'mongoose';
import { PaymentSchema } from '../../schema/payment.schema/PaymentSchema';

export interface IPayment extends Document {
  amount: number;
  payment_method: string;  
  payment_date_time: Date; 
  payment_status: string; 
  sent_by: string;        
  received_by: string;     
  order_id: mongoose.Types.ObjectId; 
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
const Payment :Model<IPayment>=mongoose.model<IPayment>('payment',PaymentSchema);
export default Payment;
