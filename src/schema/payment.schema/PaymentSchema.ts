import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Payment document
export interface IPayment extends Document {
  amount: number;
  payment_method: string;  // E.g., 'Credit Card', 'Cash', 'Bank Transfer'
  payment_date_time: Date; // The date and time when the payment was made
  payment_status: string;  // E.g., 'Pending', 'Completed', 'Failed'
  sent_by: string;         // Who initiated the payment (e.g., customer or kitchen)
  received_by: string;     // Who received the payment (e.g., kitchen or delivery staff)
  order_id: mongoose.Types.ObjectId; // Reference to the Order schema
  created_at: Date;
  updated_at: Date;
}

// Define the Payment schema
export const PaymentSchema: Schema = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },   // Payment amount
    payment_method: { type: String, required: true }, // Payment method (e.g., 'Credit Card', 'Cash')
    payment_date_time: { type: Date, required: true }, // Date and time of payment
    payment_status: { type: String, required: true }, // Payment status (e.g., 'Completed', 'Pending')
    sent_by: { type: String, required: true }, // Person who sent the payment (e.g., 'Customer')
    received_by: { type: String, required: true }, // Person who received the payment (e.g., 'Kitchen')
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order model
    created_at: { type: Date, default: Date.now }, // Creation timestamp
    updated_at: { type: Date, default: Date.now }, // Update timestamp
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Payment model
const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;
