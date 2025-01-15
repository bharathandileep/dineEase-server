import mongoose, { Document, Schema, model } from 'mongoose';


export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;      
  item_id: mongoose.Types.ObjectId;         
  order_date: Date;                         
  delivery_date: Date;                      
  address_id: mongoose.Types.ObjectId;      
  is_deleted: boolean;                      

  created_at: Date;                          
  updated_at: Date;                          
}


export const BulkOrdersSchema: Schema = new Schema<IBulkOrders>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, 
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, 
    item_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    }, 
    order_date: { 
      type: Date, 
      required: true 
    }, 
    delivery_date: { 
      type: Date, 
      required: true 
    },
    address_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Address', 
      required: true 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true } 
);
