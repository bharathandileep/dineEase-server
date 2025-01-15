import mongoose, { Document, Schema, Model } from 'mongoose';
import { OrderTrackingSchema } from '../../schema/ordertracking.schema/OrderTracking.schema';
 
export interface IOrderTracking extends Document {
  order_id: mongoose.Types.ObjectId;        
  status: string;                            
  estimated_delivery_time: Date;            
  current_status: string;                
  delivery_time: Date;                        
  current_location: string;                
  location_id: mongoose.Types.ObjectId;      
  created_at: Date;                          
  updated_at: Date;
  is_deleted: boolean;                        
}
 
 
const OrderTracking: Model<IOrderTracking> = mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);
export default OrderTracking;
 
