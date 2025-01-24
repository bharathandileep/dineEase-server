import mongoose, { Schema, Document, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IOrderTrackingHistory extends Document,CommonDBInterface {
  order_id: mongoose.Types.ObjectId;            
  kitchen_id: mongoose.Types.ObjectId;         
  user_id: mongoose.Types.ObjectId;             
  status: string;                               
  location: {                                  
    latitude: number;
    longitude: number;
  };
  estimated_delivery_time: Date;               
  updated_by: string;                           

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


const OrderTrackingHistory: Model<IOrderTrackingHistory> = mongoose.model<IOrderTrackingHistory>(
    'OrderTrackingHistory',
    OrderTrackingHistorySchema
  );
  
  export default OrderTrackingHistory;
  