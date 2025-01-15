import mongoose, { Document, Model } from 'mongoose';
import { OrderTrackingSchema } from '../../schema/ordertracking.schema/OrderTracking.schema';

export interface IOrderTracking extends Document {
  order_id: mongoose.Types.ObjectId;          
  status: string;                             
  estimated_delivery_time: Date;              
  location_id: mongoose.Types.ObjectId;      
  created_at: Date;                           
  updated_at: Date;                           
  is_deleted: boolean;
}
const OrderTracking = mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);
export default OrderTracking;