import mongoose, { Document, Schema, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';

 
export interface IOrderTracking extends Document,CommonDBInterface {
  order_id: mongoose.Types.ObjectId;        
  status: string;                            
  estimated_delivery_time: Date;            
  current_status: string;                
  delivery_time: Date;                        
  current_location: string;                
  location_id: mongoose.Types.ObjectId;      
                    
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
    current_status: {
      type: String,
      required: true,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled']
    }, 
    estimated_delivery_time: {
      type: Date,
      required: true
    },
    delivery_time: {
      type: Date,
      default: null
    }, 
    current_location: {
      type: String,
      default: ''
    }, 
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },

  },
  { timestamps: true } 
);
 



 
const OrderTracking: Model<IOrderTracking> = mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);
export default OrderTracking;
 
