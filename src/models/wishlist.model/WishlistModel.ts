import mongoose, { Document, Model } from 'mongoose';
import { WishlistSchema } from '../../schema/wishlist.schema/Wishlist.schema';

export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId;
  date_added: Date;     
  is_deleted: boolean;            
  created_at: Date;                
  updated_at: Date;                
}
const Wishlist : Model<IWishlist> = mongoose.model<IWishlist>('Wishlist',WishlistSchema)
export default Wishlist;