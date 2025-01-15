import mongoose, { Schema, Document, Model } from 'mongoose';
 

export interface IOrderStatus extends Document {
  order_id: mongoose.Types.ObjectId;      
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  time: Date;                           
  location: string;                          
  remarks?: string;                         
  created_at: Date;                          
  updated_at: Date;                         
  is_deleted: boolean;                       
}
 

export const OrderStatusSchema: Schema<IOrderStatus> = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', 
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      required: true,
    },
    time: { type: Date, default: Date.now, required: true },  
    location: { type: String, required: true },              
    remarks: { type: String, default: '' },                 
    is_deleted: { type: Boolean, default: false },            
  },
  { timestamps: true } 
);
 

const OrderStatus: Model<IOrderStatus> = mongoose.model<IOrderStatus>('OrderStatus', OrderStatusSchema);
export default OrderStatus;
 
