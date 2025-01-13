import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Customer Reply document
export interface ICustomerReply extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to User schema
  customer_support_id: mongoose.Types.ObjectId; // Reference to CustomerSupport schema
  chat_id: string;                             // Unique chat ID from CustomerSupport schema
  reply_content: string;                       // Content of the customer reply
  created_at: Date;                            // Timestamp when the reply was made
}

// Define the Customer Reply schema
export const CustomerReplySchema: Schema = new Schema<ICustomerReply>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who replies
    customer_support_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupport', required: true }, // Reference to the CustomerSupport
    chat_id: { type: String, required: true },  // Chat ID from the CustomerSupport schema
    reply_content: { type: String, required: true }, // Content of the customer's reply
    created_at: { type: Date, default: Date.now }, // Timestamp when the reply was made
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Customer Reply model
const CustomerReply = mongoose.model<ICustomerReply>('CustomerReply', CustomerReplySchema);
export default CustomerReply;
