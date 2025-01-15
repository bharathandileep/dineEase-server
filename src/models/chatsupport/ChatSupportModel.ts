import mongoose, { Schema, Document, Model } from 'mongoose';
import { ChatSchema, IChat } from '../../schema/chatsupport/ChatSupportSchema';
 
 
export interface IMessage extends Document {
  sender_id: mongoose.Types.ObjectId;
  message_text: string;              
  sent_at: Date;                      
  message_type: 'text' | 'image' | 'file';
  is_deleted: boolean;                
  created_at: Date;                          
  updated_at: Date;  
}
 
 
 
// Create and export the Chat model
const Chat: Model<IChat> = mongoose.model<IChat>('Chat', ChatSchema);
export default Chat;
 