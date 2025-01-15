import mongoose, { Document, Model } from 'mongoose';
import { CustomerReplySchema } from '../../schema/customer.reply.schema/CustomerReply.schema';

export interface ICustomerReply extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to User schema
  customer_support_id: mongoose.Types.ObjectId; // Reference to CustomerSupport schema
  chat_id: string;                             // Unique chat ID from CustomerSupport schema
  reply_content: string;                       // Content of the customer reply
  created_at: Date;                            // Timestamp when the reply was made
  is_deleted: boolean;                 

}
const CustomerReply : Model<ICustomerReply> = mongoose.model<ICustomerReply>('CustomerReply',CustomerReplySchema)
export default CustomerReply;