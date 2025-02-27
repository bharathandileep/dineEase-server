import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


 
 
export interface IBulkOrders extends Document,CommonDBInterface {
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
}
 
 export const BulkOrdersSchema: Schema = new Schema<IBulkOrders>(
   {
     user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
     }, 
     kitchen_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Kitchen',
       required: true
     }, 
     item_id: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Item',
       required: true
     }], 
     payment_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Payment',
       required: true
     }, 
     org_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Organization',
       required: true
     }, 
     order_date: {
       type: Date,
       required: true
     }, 
     delivery_date: {
       type: Date,
       required: true
     }, 
     address_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Address',
       required: true
     }, 
     order_type: {
       type: String,
       required: true
     }, 
     notes: {
       type: String,
       default: ''
     }, 

   },
   { timestamps: true } 
 );
  
 
const BulkOrders: Model<IBulkOrders> = mongoose.model<IBulkOrders>('BulkOrders', BulkOrdersSchema);
export default BulkOrders;
 