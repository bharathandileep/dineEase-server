import mongoose, { Document, Model } from 'mongoose';
import { BulkOrdersSchema } from '../../schema/bulkorder.schema/BulkOrder.schema';

export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  item_id: mongoose.Types.ObjectId;          // Reference to the Item schema
  order_date: Date;                          // Date of placing the order
  delivery_date: Date;                       // Date of delivery
  address_id: mongoose.Types.ObjectId;       // Reference to the Address schema
  created_at: Date;                          // Timestamp when the order was created
  updated_at: Date;                          // Timestamp when the order was last updated
}

const BulkOrders : Model<IBulkOrders> = mongoose.model<IBulkOrders>('BulkOrders',BulkOrdersSchema)
export default BulkOrders;