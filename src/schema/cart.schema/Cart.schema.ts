import mongoose, { Document, Schema, model } from 'mongoose';


export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId; 
  item_id: mongoose.Types.ObjectId; 
  date_added: Date;                
  is_deleted: boolean;                     

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
    is_deleted: { 
      type: Boolean, 
      default: false 
    },  
    date_added: { type: Date, default: Date.now }, 
  },
  
  { timestamps: true } 
);


