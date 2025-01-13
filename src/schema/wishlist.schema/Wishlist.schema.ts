import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Wishlist document
export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User schema
  item_id: mongoose.Types.ObjectId; // Reference to the Item schema
  date_added: Date;                // Date and time when the item was added to the wishlist
  created_at: Date;                // Timestamp when the wishlist entry was created
  updated_at: Date;                // Timestamp when the wishlist entry was last updated
}

// Define the Wishlist schema
export const WishlistSchema: Schema = new Schema<IWishlist>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to User schema
    item_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    }, // Reference to Item schema
    date_added: { type: Date, default: Date.now }, // Date and time when added to the wishlist
    created_at: { type: Date, default: Date.now }, // Timestamp for creation
    updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Wishlist model
const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;
