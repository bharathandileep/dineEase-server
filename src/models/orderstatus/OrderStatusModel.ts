import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderStatusSchema } from '../../schema/orderstatus/OrderStatus.schema';
 
 
export interface IOrderStatus extends Document {
  order_id: mongoose.Types.ObjectId;        
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  time: Date;                            
  location: string;                        
  remarks?: string;                      
  created_at: Date;                        
  updated_at: Date;                        
  is_deleted: boolean;                      
}
 
 
 
const OrderStatus: Model<IOrderStatus> = mongoose.model<IOrderStatus>('OrderStatus', OrderStatusSchema);
export default OrderStatus;
 
