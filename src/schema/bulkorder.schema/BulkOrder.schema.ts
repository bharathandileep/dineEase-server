import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the BulkOrders document
export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  item_id: mongoose.Types.ObjectId;          // Reference to the Item schema
  order_date: Date;                          // Date of placing the order
  delivery_date: Date;                       // Date of delivery
  address_id: mongoose.Types.ObjectId;       // Reference to the Address schema
  created_at: Date;                          // Timestamp when the order was created
  updated_at: Date;                          // Timestamp when the order was last updated
}

// Define the BulkOrders schema
export const BulkOrdersSchema: Schema = new Schema<IBulkOrders>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to User schema
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, // Reference to Kitchen schema
    item_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    }, // Reference to Item schema
    order_date: { 
      type: Date, 
      required: true 
    }, // Date when the order was placed
    delivery_date: { 
      type: Date, 
      required: true 
    }, // Date for delivery
    address_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Address', 
      required: true 
    }, // Reference to Address schema
    created_at: { type: Date, default: Date.now }, // Timestamp for creation
    updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the BulkOrders model
const BulkOrders = mongoose.model<IBulkOrders>('BulkOrders', BulkOrdersSchema);
export default BulkOrders;
