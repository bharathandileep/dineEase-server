import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Billing document
export interface IBilling extends Document {
  order_id: mongoose.Types.ObjectId;   // Reference to the Order schema
  billing_date: Date;                   // Date and time of the billing
  created_at: Date;                     // Timestamp when the billing was created
  updated_at: Date;                     // Timestamp when the billing was last updated
}

// Define the Billing schema
export const BillingSchema: Schema = new Schema<IBilling>(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to the Order schema
    billing_date: { type: Date, default: Date.now, required: true }, // Date and time when the billing occurred
    created_at: { type: Date, default: Date.now }, // Timestamp when the billing record was created
    updated_at: { type: Date, default: Date.now }, // Timestamp when the billing record was last updated
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Billing model
const Billing = mongoose.model<IBilling>('Billing', BillingSchema);
export default Billing;
