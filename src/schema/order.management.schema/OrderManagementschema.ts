import mongoose, { Document, Schema, model } from 'mongoose';


export interface IOrderManagement extends Document {
  user_id: mongoose.Types.ObjectId;        
  order_id: mongoose.Types.ObjectId;       
  kitchen_id: mongoose.Types.ObjectId;
  organization_id: mongoose.Types.ObjectId; 
  order_type: string;                     
  order_status: string;                    
  order_total_amount: number;             
  item_id: mongoose.Types.ObjectId;       
  ordered_time: Date;                     
  delivery_time: Date;                    
  delivery_instructions: string;           
  is_deleted: boolean;                     

  created_at: Date;
  updated_at: Date;
  payment_id: mongoose.Types.ObjectId;     
}


export const OrderManagementSchema: Schema = new Schema<IOrderManagement>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }, 
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, 
    order_type: { type: String, required: true },  
    order_status: { type: String, required: true },
    order_total_amount: { type: Number, required: true },
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }, 
    ordered_time: { type: Date, required: true }, 
    delivery_time: { type: Date, required: true }, 
    delivery_instructions: { type: String, default: '' },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
    
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  },
  { timestamps: true } 
);


