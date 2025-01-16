import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IWishlist extends Document,CommonDBInterface {
  user_id: mongoose.Types.ObjectId;
  item_id: mongoose.Types.ObjectId;
  date_added: Date;     
             
}
export const WishlistSchema: Schema = new Schema<IWishlist>(
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
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
    date_added: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);



const Wishlist : Model<IWishlist> = mongoose.model<IWishlist>('Wishlist',WishlistSchema)
export default Wishlist;