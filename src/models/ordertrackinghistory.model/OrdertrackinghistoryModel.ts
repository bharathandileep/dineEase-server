import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderTrackingHistorySchema } from '../../schema/ordertrackinghistory.schema/OrdertrackinghistorySchema';

export interface IOrderTrackingHistory extends Document {
  order_id: mongoose.Types.ObjectId;            // Reference to the Order schema
  kitchen_id: mongoose.Types.ObjectId;          // Reference to the Kitchen schema
  user_id: mongoose.Types.ObjectId;             // Reference to the User schema
  status: string;                               // Current status of the order
  location: {                                   // Location details for tracking
    latitude: number;
    longitude: number;
  };
  estimated_delivery_time: Date;                // Estimated delivery time
  updated_by: string;                           // Who updated the status (user, driver, kitchen)
  updated_at: Date;                             // Timestamp when the status was updated
  created_at: Date;                             // Timestamp when the history record was created
  is_deleted: boolean;
}
// Create and export the OrderTrackingHistory model
const OrderTrackingHistory: Model<IOrderTrackingHistory> = mongoose.model<IOrderTrackingHistory>(
    'OrderTrackingHistory',
    OrderTrackingHistorySchema
  );
  
  export default OrderTrackingHistory;
  