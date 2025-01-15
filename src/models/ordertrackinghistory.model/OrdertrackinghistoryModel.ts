import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderTrackingHistorySchema } from '../../schema/ordertrackinghistory.schema/OrdertrackinghistorySchema';

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
  updated_by: string;                           
  updated_at: Date;                            
  created_at: Date;                             
  is_deleted: boolean;
}

const OrderTrackingHistory: Model<IOrderTrackingHistory> = mongoose.model<IOrderTrackingHistory>(
    'OrderTrackingHistory',
    OrderTrackingHistorySchema
  );
  
  export default OrderTrackingHistory;
  