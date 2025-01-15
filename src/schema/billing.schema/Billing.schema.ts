import mongoose, { Document, Schema, model } from 'mongoose';


export interface IBilling extends Document {
  order_id: mongoose.Types.ObjectId;  
  billing_date: Date;                   
  is_deleted: boolean;                     
  created_at: Date;                  
  updated_at: Date;                     
}

export const BillingSchema: Schema = new Schema<IBilling>(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, 
    billing_date: { type: Date, default: Date.now, required: true }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);

