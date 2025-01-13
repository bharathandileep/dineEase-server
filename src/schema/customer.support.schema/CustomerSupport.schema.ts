import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Customer Support document
export interface ICustomerSupport extends Document {
  user_id: mongoose.Types.ObjectId;         // Reference to User schema
  type_of_connection: string;                // Type of connection (e.g., 'Chat', 'Email', 'Phone')
  content: string;                           // Content of the conversation or support request
  chat_id: string;                           // Unique chat ID for each chat
  sent_by: string;                           // Who sent the message (e.g., customer or support team)
  received_by: string;                       // Who received the message (e.g., support team or customer)
  kitchen_id: mongoose.Types.ObjectId;      // Reference to Kitchen schema
  organization_id: mongoose.Types.ObjectId; // Reference to Organization schema
  attachments: string[];                     // Array of attachment URLs or file paths
  created_at: Date;                          // Timestamp when the support request was created
  updated_at: Date;                          // Timestamp when the support request was last updated
}

// Define the Customer Support schema
export const CustomerSupportSchema: Schema = new Schema<ICustomerSupport>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID reference
    type_of_connection: { type: String, required: true },  // Type of connection (e.g., 'Chat', 'Email')
    content: { type: String, required: true },             // Content of the support message or chat
    chat_id: { type: String, required: true, unique: true }, // Unique chat ID for each conversation
    sent_by: { type: String, required: true }, // Who sent the message (e.g., 'Customer', 'Support Team')
    received_by: { type: String, required: true }, // Who received the message (e.g., 'Support', 'Customer')
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }, // Kitchen reference
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Organization reference
    attachments: { type: [String], default: [] }, // Array of attachment URLs or file paths (optional)
    created_at: { type: Date, default: Date.now }, // Created timestamp
    updated_at: { type: Date, default: Date.now }, // Updated timestamp
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Customer Support model
const CustomerSupport = mongoose.model<ICustomerSupport>('CustomerSupport', CustomerSupportSchema);
export default CustomerSupport;
