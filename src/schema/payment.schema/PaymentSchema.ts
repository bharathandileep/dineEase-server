import mongoose, { Document, Schema, Model } from 'mongoose';
 

export interface IPayment extends Document {
  amount: number;
  transaction_id: string;
  payment_method: string;  
  payment_date_time: Date; 
  payment_status: string;  
  sent_by: string;         
  received_by: string;     
  order_id: mongoose.Types.ObjectId; 
  is_deleted: boolean;     
  failure_reason?: string; 
  created_at: Date;
  updated_at: Date;
}
 

export const PaymentSchema: Schema = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },   
    payment_method: { type: String, required: true },
    payment_date_time: { type: Date, required: true }, 
    payment_status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
    },
    sent_by: { type: String, required: true }, 
    received_by: { type: String, required: true }, 
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, 
    is_deleted: { type: Boolean, default: false }, 
    failure_reason: {
      type: String,
      default: '',
      validate: {
        validator: function(v: string) {
        
          return this.payment_status !== 'failed' || (v && v.trim().length > 0);
        },
        message: 'Failure reason is required when the payment status is failed.',
      },
    }, 
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
 

const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;