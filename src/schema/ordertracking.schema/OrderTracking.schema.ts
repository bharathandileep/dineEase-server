import mongoose, { Document, Schema, model } from 'mongoose';


export interface IOrderTracking extends Document {
  order_id: mongoose.Types.ObjectId;          
  status: string;                             
  estimated_delivery_time: Date;              
  location_id: mongoose.Types.ObjectId;       
  is_deleted: boolean;                     

  created_at: Date;                          
  updated_at: Date;                           
}


export const OrderTrackingSchema: Schema = new Schema<IOrderTracking>(
  {
    order_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order', 
      required: true 
    }, 
    status: { 
      type: String, 
      required: true, 
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'] 
    }, 
    estimated_delivery_time: { 
      type: Date, 
      required: true 
    }, 
    location_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Location', 
      required: true 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
    
  },
  { timestamps: true } 
);


