import mongoose, { Document, Model } from 'mongoose';
import { CustomerSupportSchema } from '../../schema/customer.support.schema/CustomerSupport.schema';

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
  created_at: Date;                          
  updated_at: Date;                          
  is_deleted: boolean;                 

}

const CustomerSupport :Model<ICustomerSupport> = mongoose.model<ICustomerSupport>('CustomerSupport',CustomerSupportSchema)
export default CustomerSupport;