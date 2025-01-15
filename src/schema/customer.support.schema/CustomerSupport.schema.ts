import mongoose, { Document, Schema, model } from 'mongoose';


export interface ICustomerSupport extends Document {
  user_id: mongoose.Types.ObjectId;         
  type_of_connection: string;               
  content: string;                           
  chat_id: string;                           
  sent_by: string;                          
  received_by: string;                       
  kitchen_id: mongoose.Types.ObjectId;    
  organization_id: mongoose.Types.ObjectId; 
  attachments: string[];                    
  is_deleted: boolean;                     

  created_at: Date;                          
  updated_at: Date;                        
}


export const CustomerSupportSchema: Schema = new Schema<ICustomerSupport>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    type_of_connection: { type: String, required: true },  
    content: { type: String, required: true },             
    chat_id: { type: String, required: true, unique: true }, 
    sent_by: { type: String, required: true }, 
    received_by: { type: String, required: true }, 
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }, 
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
    attachments: { type: [String], default: [] }, 
    
  },
  { timestamps: true } 
);


