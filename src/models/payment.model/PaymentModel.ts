import mongoose, { Document, Model } from 'mongoose';
import { PaymentSchema } from '../../schema/payment.schema/PaymentSchema';

export interface IPayment extends Document {
  amount: number;
  payment_method: string;  // E.g., 'Credit Card', 'Cash', 'Bank Transfer'
  payment_date_time: Date; // The date and time when the payment was made
  payment_status: string;  // E.g., 'Pending', 'Completed', 'Failed'
  sent_by: string;         // Who initiated the payment (e.g., customer or kitchen)
  received_by: string;     // Who received the payment (e.g., kitchen or delivery staff)
  order_id: mongoose.Types.ObjectId; // Reference to the Order schema
  created_at: Date;
  updated_at: Date;
}
const Payment :Model<IPayment>=mongoose.model<IPayment>('payment',PaymentSchema);
export default Payment;
