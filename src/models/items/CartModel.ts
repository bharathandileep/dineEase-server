import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


 
export interface ICart extends Document,CommonDBInterface {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId;
  quantity: number;                  
  customisation: string;            
  total_amount: number;              
  delivery_time: Date;              
  date_added: Date;    
               
}
export const CartSchema: Schema = new Schema<ICart>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    }, 
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }, 
    customisation: {
      type: String,
      default: '',
    }, 
    total_amount: {
      type: Number,
      required: true,
      min: 0
    }, 
    delivery_time: {
      type: Date,
      required: true
    },
    date_added: {
      type: Date,
      default: Date.now
    }, 
    }, 

)


const Cart : Model<ICart> = mongoose.model<ICart>('Cart',CartSchema)
export default Cart;