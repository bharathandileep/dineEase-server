import mongoose, { Document, Schema, model } from 'mongoose';


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


export const PaymentSchema: Schema = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },   
    payment_method: { type: String, required: true },
    payment_date_time: { type: Date, required: true },
    payment_status: { type: String, required: true }, 
    sent_by: { type: String, required: true }, 
    received_by: { type: String, required: true }, 
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
    
  },
  { timestamps: true } 
);


