import mongoose, { Document, Model } from 'mongoose';
import { CustomerSupportSchema } from '../../schema/customer.support.schema/CustomerSupport.schema';

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

const CustomerSupport :Model<ICustomerSupport> = mongoose.model<ICustomerSupport>('CustomerSupport',CustomerSupportSchema)
export default CustomerSupport;