import mongoose, { Document, Schema, model } from 'mongoose';
 
// Define an interface for the OrderTracking document
export interface IOrderTracking extends Document {
  order_id: mongoose.Types.ObjectId;          // Reference to the Order schema
  status: string;                             // Current status of the order
  estimated_delivery_time: Date;              // Estimated delivery time for the order
  current_status: string;                     // Current status of the order (e.g., 'Pending', 'Preparing', etc.)
  delivery_time: Date;                        // Actual delivery time of the order
  current_location: string;                   // Current location or delivery address
  location_id: mongoose.Types.ObjectId;       // Reference to the Location schema
  created_at: Date;                           // Timestamp when the tracking record was created
  updated_at: Date;                           // Timestamp when the tracking record was last updated
}
 
// Define the OrderTracking schema
export const OrderTrackingSchema: Schema = new Schema<IOrderTracking>(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    }, // Reference to Order schema
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled']
    }, // Current status of the order with predefined values
    current_status: {
      type: String,
      required: true,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled']
    }, // A more specific current status field
    estimated_delivery_time: {
      type: Date,
      required: true
    }, // Estimated delivery time
    delivery_time: {
      type: Date,
      default: null
    }, // Actual delivery time of the order
    current_location: {
      type: String,
      default: ''
    }, // Current location of the order or delivery address
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    }, // Reference to Location schema
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
);
 
// Create and export the OrderTracking model
const OrderTracking = mongoose.model<IOrderTracking>('OrderTracking', OrderTrackingSchema);
export default OrderTracking;
 
