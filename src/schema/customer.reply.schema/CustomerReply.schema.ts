import mongoose, { Document, Schema, model } from 'mongoose';


export interface ICustomerReply extends Document {
  user_id: mongoose.Types.ObjectId;         
  customer_support_id: mongoose.Types.ObjectId; 
  chat_id: string;                            
  reply_content: string;                      
  is_deleted: boolean;                      

  created_at: Date;                            
}


export const CustomerReplySchema: Schema = new Schema<ICustomerReply>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    customer_support_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSupport', required: true }, 
    chat_id: { type: String, required: true },  
    reply_content: { type: String, required: true }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
   
  },
  { timestamps: true } 
);


