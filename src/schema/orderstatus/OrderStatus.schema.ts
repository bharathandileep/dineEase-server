import mongoose, { Schema, Document, Model } from 'mongoose';
 
// Define the OrderStatus schema interface
export interface IOrderStatus extends Document {
  order_id: mongoose.Types.ObjectId;        // Reference to the Order it belongs to
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'; // Order status
  time: Date;                               // The time when the status was updated
  location: string;                          // Location associated with this status (e.g., warehouse or delivery address)
  remarks?: string;                          // Optional remarks or additional info related to the status
  created_at: Date;                          // Timestamp when the status record was created
  updated_at: Date;                          // Timestamp when the status record was last updated
  is_deleted: boolean;                       // Indicates whether the order status has been deleted (soft deletion)
}
 
// Define the OrderStatus schema
export const OrderStatusSchema: Schema<IOrderStatus> = new Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Reference to the Order model
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      required: true,
    },
    time: { type: Date, default: Date.now, required: true },  // Time when the status was updated
    location: { type: String, required: true },               // Location associated with the status
    remarks: { type: String, default: '' },                   // Optional remarks related to the status
    is_deleted: { type: Boolean, default: false },            // Soft delete flag (default is false)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the OrderStatus model
const OrderStatus: Model<IOrderStatus> = mongoose.model<IOrderStatus>('OrderStatus', OrderStatusSchema);
export default OrderStatus;
 
