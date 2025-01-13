import mongoose, { Document, Model } from 'mongoose';
import { WishlistSchema } from '../../schema/wishlist.schema/Wishlist.schema';

export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User schema
  item_id: mongoose.Types.ObjectId; // Reference to the Item schema
  date_added: Date;                // Date and time when the item was added to the wishlist
  created_at: Date;                // Timestamp when the wishlist entry was created
  updated_at: Date;                // Timestamp when the wishlist entry was last updated
}
const Wishlist : Model<IWishlist> = mongoose.model<IWishlist>('Wishlist',WishlistSchema)
export default Wishlist;