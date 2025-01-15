import mongoose, { Document, Model } from 'mongoose';
import { OrderManagementSchema } from '../../schema/indorderm.schema/IndOrderSchema';
 
export interface IOrderManagement extends Document {
  user_id: mongoose.Types.ObjectId;        
  order_id: mongoose.Types.ObjectId;    
  kitchen_id: mongoose.Types.ObjectId;    
  organization_id: mongoose.Types.ObjectId;
  order_type: string;                      
  order_status: string;                  
  order_total_amount: number;              
  item_id: mongoose.Types.ObjectId;        
  ordered_time: Date;                  
  delivery_time: Date;                    
  delivery_instructions: string;        
  created_at: Date;
  updated_at: Date;
  payment_id: mongoose.Types.ObjectId;    
  ratingnreview_id: mongoose.Types.ObjectId;  
  feedback_id: mongoose.Types.ObjectId;  
  ordertracking_id: mongoose.Types.ObjectId;  
  is_deleted: boolean;
}
  const OrderManagement : Model<IOrderManagement>=mongoose.model<IOrderManagement>('OrderManagement',OrderManagementSchema)
  export default OrderManagement;