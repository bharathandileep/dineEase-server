

import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganizationSchema } from '../../schema/org.schema/OrgSchema';


export interface IOrganisation extends Document {
  user_id: mongoose.Types.ObjectId;        
  address_id: mongoose.Types.ObjectId;      
  name: string;                            
  register_number: string;                  
  location: string;                         
  contact_number: string;                  
  email: string;                           
  no_of_employees: number;                 
  is_deleted: boolean;                     
  created_at: Date;                         
  updated_at: Date;                        
}




const Organisation: Model<IOrganisation> = mongoose.model<IOrganisation>('Organisation', OrganizationSchema);
export default Organisation;
