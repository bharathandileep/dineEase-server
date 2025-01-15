import mongoose, { Document, Model } from 'mongoose';
import { OrderTrackingSchema } from '../../schema/ordertracking.schema/OrderTracking.schema';

export interface IOrderTracking extends Document {
  order_id: mongoose.Types.ObjectId;          // Reference to the Order schema
  status: string;                             // Current status of the order
  estimated_delivery_time: Date;              // Estimated delivery time for the order
  location_id: mongoose.Types.ObjectId;       // Reference to the Location schema
  created_at: Date;                           // Timestamp when the tracking record was created
  updated_at: Date;                           // Timestamp when the tracking record was last updated
  is_deleted: boolean;
}
const OrderTracking = mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);
export default OrderTracking;