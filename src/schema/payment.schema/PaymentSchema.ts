import mongoose, { Document, Schema, Model } from 'mongoose';
 
// Define an interface for the Payment document
export interface IPayment extends Document {
  amount: number;
  transaction_id: string; // Unique transaction ID
  payment_method: string;  // E.g., 'Credit Card', 'Cash', 'Bank Transfer'
  payment_date_time: Date; // The date and time when the payment was made
  payment_status: string;  // E.g., 'Pending', 'Completed', 'Failed'
  sent_by: string;         // Who initiated the payment (e.g., customer or kitchen)
  received_by: string;     // Who received the payment (e.g., kitchen or delivery staff)
  order_id: mongoose.Types.ObjectId; // Reference to the Order schema
  is_deleted: boolean;     // Indicates whether the payment is soft deleted
  failure_reason?: string; // Optional field to store the reason if the payment failed
  created_at: Date;
  updated_at: Date;
}
 
// Define the Payment schema
export const PaymentSchema: Schema = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },   // Payment amount
    payment_method: { type: String, required: true }, // Payment method (e.g., 'Credit Card', 'Cash')
    payment_date_time: { type: Date, required: true }, // Date and time of payment
    payment_status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
    },
    sent_by: { type: String, required: true }, // Person who sent the payment (e.g., 'Customer')
    received_by: { type: String, required: true }, // Person who received the payment (e.g., 'Kitchen')
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order model
    is_deleted: { type: Boolean, default: false }, // Soft delete flag (default: false)
    failure_reason: {
      type: String,
      default: '',
      validate: {
        validator: function(v: string) {
          // Only allow failure_reason if payment_status is 'failed'
          return this.payment_status !== 'failed' || (v && v.trim().length > 0);
        },
        message: 'Failure reason is required when the payment status is failed.',
      },
    }, // Reason for failure (only applicable when payment_status is 'failed')
    created_at: { type: Date, default: Date.now }, // Creation timestamp
    updated_at: { type: Date, default: Date.now }, // Update timestamp
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the Payment model
const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;