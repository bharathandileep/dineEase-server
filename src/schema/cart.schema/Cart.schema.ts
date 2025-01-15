import mongoose, { Document, Schema, model } from 'mongoose';
 

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId; 
  item_id: mongoose.Types.ObjectId; 
  quantity: number;                  
  customisation: string;             
  total_amount: number;              
  delivery_time: Date;            
  date_added: Date;                  
  created_at: Date;                  
  updated_at: Date;                 
}
 

export const CartSchema: Schema = new Schema<ICart>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    }, 
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }, 
    customisation: {
      type: String,
      default: '',
    }, 
    total_amount: {
      type: Number,
      required: true,
      min: 0
    }, 
    delivery_time: {
      type: Date,
      required: true
    },
    date_added: {
      type: Date,
      default: Date.now
    }, 
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }, 
  },
  { timestamps: true } 
)

