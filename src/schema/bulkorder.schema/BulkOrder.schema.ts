import mongoose, { Document, Model, Schema } from 'mongoose';
 
// Define an interface for the BulkOrders document
export interface IBulkOrders extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  item_id: mongoose.Types.ObjectId[];        // Array of references to Item schema
  payment_id: mongoose.Types.ObjectId;       // Reference to the Payment schema
  org_id: mongoose.Types.ObjectId;           // Reference to the Organization schema
  order_date: Date;                          // Date of placing the order
  delivery_date: Date;                       // Date of delivery
  address_id: mongoose.Types.ObjectId;       // Reference to the Address schema
  order_type: string;                        // Type of order (e.g., 'Bulk', 'Special', etc.)
  notes: string;                             // Additional notes for the order
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
    item_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    }], // Array of references to Item schema (supports multiple items in the bulk order)
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true
    }, // Reference to Payment schema
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    }, // Reference to Organization schema
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
    order_type: {
      type: String,
      required: true
    }, // Type of the order (e.g., 'Bulk', 'Special')
    notes: {
      type: String,
      default: ''
    }, // Additional notes for the order (optional)
    created_at: {
      type: Date,
      default: Date.now
    }, // Timestamp when the order was created
    updated_at: {
      type: Date,
      default: Date.now
    }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the BulkOrders model
const BulkOrders: Model<IBulkOrders> = mongoose.model<IBulkOrders>('BulkOrders', BulkOrdersSchema);
export default BulkOrders;