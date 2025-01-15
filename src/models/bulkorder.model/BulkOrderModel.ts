import mongoose, { Document, Model, Schema } from 'mongoose';
import { BulkOrdersSchema } from '../../schema/bulkorder.schema/BulkOrder.schema';

 
 
export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;      
  item_id: mongoose.Types.ObjectId[];      
  payment_id: mongoose.Types.ObjectId;      
  org_id: mongoose.Types.ObjectId;          
  order_date: Date;                        
  delivery_date: Date;                    
  address_id: mongoose.Types.ObjectId;      
  order_type: string;                      
  notes: string;                            
  created_at: Date;                        
  updated_at: Date;
  is_deleted: boolean;                        
}
 
 
const BulkOrders: Model<IBulkOrders> = mongoose.model<IBulkOrders>('BulkOrders', BulkOrdersSchema);
export default BulkOrders;
 