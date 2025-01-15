import mongoose, { Document, Model } from 'mongoose';
import { CartSchema } from '../../schema/cart.schema/Cart.schema';
 
export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId; 
  date_added: Date;                
  created_at: Date;               
  updated_at: Date;               
  is_deleted: boolean;                 

}
const Cart : Model<ICart> = mongoose.model<ICart>('Cart',CartSchema)
export default Cart;