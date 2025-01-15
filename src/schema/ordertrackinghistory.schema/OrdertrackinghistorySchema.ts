import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IOrderTrackingHistory extends Document {
  order_id: mongoose.Types.ObjectId;            
  kitchen_id: mongoose.Types.ObjectId;          
  user_id: mongoose.Types.ObjectId;            
  status: string;                               
  location: {                                   
    latitude: number;
    longitude: number;
  };
  estimated_delivery_time: Date;                
  is_deleted: boolean;                      

  updated_by: string;                           
  updated_at: Date;                             
  created_at: Date;                             
}


export const OrderTrackingHistorySchema: Schema<IOrderTrackingHistory> = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    }, 
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true,
    }, 
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, 
    status: {
      type: String,
      required: true,
      enum: [
        'Order Placed',
        'Preparing',
        'Ready for Pickup',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
      ],
    }, 
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    }, 
    estimated_delivery_time: {
      type: Date,
      required: false,
    }, 
    updated_by: {
      type: String,
      required: true,
      enum: ['User', 'Driver', 'Kitchen'],
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);

