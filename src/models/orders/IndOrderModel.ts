import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';

 
export interface IOrderManagement extends Document,CommonDBInterface {
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
  payment_id: mongoose.Types.ObjectId;    
  ratingnreview_id: mongoose.Types.ObjectId;  
  feedback_id: mongoose.Types.ObjectId;  
  ordertracking_id: mongoose.Types.ObjectId;  

}
export const OrderManagementSchema: Schema = new Schema<IOrderManagement>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true },
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    order_type: { type: String, required: true },  
    order_status: { type: String, required: true }, 
    order_total_amount: { type: Number, required: true }, 
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }, 
    ordered_time: { type: Date, required: true }, 
    delivery_time: { type: Date, required: true }, 
    delivery_instructions: { type: String, default: '' }, 
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true }, 
    ratingnreview_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingAndReview', 
      required: true
    }, 
    feedback_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback', 
      required: true
    }, 
    ordertracking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderTracking', 
      required: true
    }, 
  },
  { timestamps: true } 
);
 

  const OrderManagement : Model<IOrderManagement>=mongoose.model<IOrderManagement>('OrderManagement',OrderManagementSchema)
  export default OrderManagement;