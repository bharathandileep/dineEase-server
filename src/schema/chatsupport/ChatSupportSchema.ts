import mongoose, { Schema, Document, Model } from 'mongoose';
 
// Define the Message interface (sub-document for individual messages)
export interface IMessage extends Document {
  sender_id: mongoose.Types.ObjectId; // User or Support Agent
  message_text: string;                // The message content
  sent_at: Date;                       // Timestamp when the message was sent
  message_type: 'text' | 'image' | 'file'; // Type of the message (e.g., text, image)
}
 
// Define the Chat schema interface
export interface IChat extends Document {
  user_id: mongoose.Types.ObjectId;       // Reference to the User
  support_agent_id: mongoose.Types.ObjectId; // Reference to the Support Agent
  messages: IMessage[];                    // Array of messages exchanged
  status: 'open' | 'closed' | 'in-progress'; // Current status of the chat
  created_at: Date;                        // Timestamp when the chat started
  updated_at: Date;                        // Timestamp when the chat was last updated
  last_message_timestamp: Date;            // Timestamp of the last message sent
  resolved_by?: mongoose.Types.ObjectId;  // Support agent who resolved the issue (optional)
}
 
// Define the Message sub-schema for individual messages
export const MessageSchema: Schema<IMessage> = new Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'sender_type',  // Reference to either User or SupportAgent
      required: true,
    },
    message_text: { type: String, required: true },
    sent_at: { type: Date, default: Date.now },
    message_type: {
      type: String,
      enum: ['text', 'image', 'file'],
      default: 'text',
    },
  },
  { timestamps: true }
);
 
// Define the Chat schema
export const ChatSchema: Schema<IChat> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    support_agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportAgent', // Reference to the Support Agent model
      required: true,
    },
    messages: [MessageSchema], // Store messages in an array
    status: {
      type: String,
      enum: ['open', 'closed', 'in-progress'],
      default: 'open',
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    last_message_timestamp: { type: Date, default: Date.now },
    resolved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportAgent', // Reference to the Support Agent model
      required: false,
    },
  },
  { timestamps: true }
);
 
 
 