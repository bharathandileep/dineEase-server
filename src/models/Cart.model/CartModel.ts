import mongoose, { Document, Model } from 'mongoose';
import { CartSchema } from '../../schema/cart.schema/Cart.schema';

 
export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId;
  quantity: number;                  
  customisation: string;            
  total_amount: number;              
  delivery_time: Date;              
  date_added: Date;    
  is_deleted: boolean;              
  created_at: Date;                
  updated_at: Date;                  
}
 
const Cart : Model<ICart> = mongoose.model<ICart>('Cart',CartSchema)
export default Cart;