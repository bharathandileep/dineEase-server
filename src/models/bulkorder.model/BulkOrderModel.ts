import mongoose, { Document, Model } from 'mongoose';
import { BulkOrdersSchema } from '../../schema/bulkorder.schema/BulkOrder.schema';

export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;       
  item_id: mongoose.Types.ObjectId;         
  order_date: Date;                          
  delivery_date: Date;                       
  address_id: mongoose.Types.ObjectId;       
  is_deleted: boolean;                 
   created_at: Date;                          
  updated_at: Date;                          
}

const BulkOrders : Model<IBulkOrders> = mongoose.model<IBulkOrders>('BulkOrders',BulkOrdersSchema)
export default BulkOrders;