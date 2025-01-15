import mongoose, { Document, Schema, model } from 'mongoose';
 

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User schema
  item_id: mongoose.Types.ObjectId; // Reference to the Item schema
  quantity: number;                  // Quantity of the item in the cart
  customisation: string;             // Customisation details (e.g., special requests)
  total_amount: number;              // Total amount for this cart entry (quantity * price)
  delivery_time: Date;               // Estimated delivery time
  date_added: Date;                  // Date and time when the item was added to the cart
  created_at: Date;                  // Timestamp when the cart entry was created
  updated_at: Date;                  // Timestamp when the cart entry was last updated
}
 
// Define the Cart schema
export const CartSchema: Schema = new Schema<ICart>(
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }, // Quantity of the item in the cart
    customisation: {
      type: String,
      default: '',
    }, // Customization details
    total_amount: {
      type: Number,
      required: true,
      min: 0
    }, // Total amount for the item (quantity * price)
    delivery_time: {
      type: Date,
      required: true
    }, // Estimated delivery time
    date_added: {
      type: Date,
      default: Date.now
    }, // Date and time when added to the cart
    created_at: {
      type: Date,
      default: Date.now
    }, // Timestamp for creation
    updated_at: {
      type: Date,
      default: Date.now
    }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

