import mongoose, { Document, Model } from 'mongoose';
import { OrderManagementSchema} from '../../schema/order.management.schema/OrderManagementschema';

export interface IOrderManagement extends Document {
  user_id: mongoose.Types.ObjectId;        // Reference to User schema
  order_id: mongoose.Types.ObjectId;       // Reference to Order schema
  kitchen_id: mongoose.Types.ObjectId;     // Reference to Kitchen schema
  organization_id: mongoose.Types.ObjectId; // Reference to Organization schema
  order_type: string;                      // E.g., 'Dine-in', 'Takeout', 'Delivery'
  order_status: string;                    // E.g., 'Pending', 'Completed', 'Cancelled'
  order_total_amount: number;              // Total amount of the order
  item_id: mongoose.Types.ObjectId;        // Reference to Menu schema (the ordered item)
  ordered_time: Date;                      // Date and time when the order was placed
  delivery_time: Date;                     // Date and time when the order is expected to be delivered
  delivery_instructions: string;           // Delivery instructions (if any)
  created_at: Date;
  updated_at: Date;
  payment_id: mongoose.Types.ObjectId;     // Reference to Payment schema
  is_deleted: boolean;
}
  const OrderManagement : Model<IOrderManagement>=mongoose.model<IOrderManagement>('OrderManagement',OrderManagementSchema)
  export default OrderManagement;