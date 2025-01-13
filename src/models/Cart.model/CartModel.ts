import mongoose, { Document, Model } from 'mongoose';
import { CartSchema } from '../../schema/cart.schema/Cart.schema';
 
export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User schema
  item_id: mongoose.Types.ObjectId; // Reference to the Item schema
  date_added: Date;                // Date and time when the item was added to the cart
  created_at: Date;                // Timestamp when the cart entry was created
  updated_at: Date;                // Timestamp when the cart entry was last updated
}
const Cart : Model<ICart> = mongoose.model<ICart>('Cart',CartSchema)
export default Cart;