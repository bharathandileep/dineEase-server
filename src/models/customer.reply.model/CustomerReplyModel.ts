import mongoose, { Document, Model } from 'mongoose';
import { CustomerReplySchema } from '../../schema/customer.reply.schema/CustomerReply.schema';

export interface ICustomerReply extends Document {
  user_id: mongoose.Types.ObjectId;          
  customer_support_id: mongoose.Types.ObjectId;
  chat_id: string;
  reply_content: string;                       
  created_at: Date;                            
  is_deleted: boolean;                 

}
const CustomerReply : Model<ICustomerReply> = mongoose.model<ICustomerReply>('CustomerReply',CustomerReplySchema)
export default CustomerReply;