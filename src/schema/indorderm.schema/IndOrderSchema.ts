import mongoose, { Document, Schema, model } from 'mongoose';
 
// Define an interface for the Order Management document
export interface IOrderManagement extends Document {
  user_id: mongoose.Types.ObjectId;        // Reference to User schema
  order_id: mongoose.Types.ObjectId;       // Reference to Order schema
  kitchen_id: mongoose.Types.ObjectId;     // Reference to Kitchen schema
  organization_id: mongoose.Types.ObjectId; // Reference to Organization schema
  order_type: string;                      // E.g., 'Dine-in', 'Takeout', 'Delivery'
  order_status: string;                    // E.g., 'Pending', 'Completed', 'Cancelled'
  order_total_amount: number;              // Total amount of the order
  item_id: mongoose.Types.ObjectId;        // Reference to Menu schema (the ordered item)
  ordered_time: Date;                      // Date and time when the order was placed
  delivery_time: Date;                     // Date and time when the order is expected to be delivered
  delivery_instructions: string;           // Delivery instructions (if any)
  created_at: Date;
  updated_at: Date;
  payment_id: mongoose.Types.ObjectId;     // Reference to Payment schema
  ratingnreview_id: mongoose.Types.ObjectId;  // Reference to RatingAndReview schema
  feedback_id: mongoose.Types.ObjectId;      // Reference to Feedback schema
  ordertracking_id: mongoose.Types.ObjectId; // Reference to OrderTracking schema
}
 
// Define the Order Management schema
export const OrderManagementSchema: Schema = new Schema<IOrderManagement>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User who placed the order
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Order ID reference
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }, // Kitchen ID reference
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Organization ID reference
    order_type: { type: String, required: true },  // Type of the order ('Dine-in', 'Takeout', etc.)
    order_status: { type: String, required: true }, // Current status of the order ('Pending', 'Completed', etc.)
    order_total_amount: { type: Number, required: true }, // Total order amount
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }, // Menu item ID reference
    ordered_time: { type: Date, required: true }, // Time when the order was placed
    delivery_time: { type: Date, required: true }, // Expected delivery time
    delivery_instructions: { type: String, default: '' }, // Delivery instructions (optional)
    created_at: { type: Date, default: Date.now }, // Created timestamp
    updated_at: { type: Date, default: Date.now }, // Updated timestamp
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true }, // Payment reference
    ratingnreview_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingAndReview', // Reference to RatingAndReview schema
      required: true
    }, // Reference to RatingAndReview schema
    feedback_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback', // Reference to Feedback schema
      required: true
    }, // Reference to Feedback schema
    ordertracking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderTracking', // Reference to OrderTracking schema
      required: true
    }, // Reference to OrderTracking schema
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the Order Management model
const OrderManagement = mongoose.model<IOrderManagement>('OrderManagement', OrderManagementSchema);
export default OrderManagement;
 
