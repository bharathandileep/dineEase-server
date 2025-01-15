import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganizationLogsSchema } from '../../schema/orglog.schema/OrglogSchema';

export interface IOrganizationLogs extends Document {
  organization_id: mongoose.Types.ObjectId;  
  login_method: string;                       
  login_time: Date;                           
  logout_time: Date;                          
  google_token: string;                       
  ip_address: string;                        
  device_information: string;                
  location: string;                           
  is_deleted: boolean;                       
  created_at: Date;                          
  updated_at: Date;                         
}

const OrganizationLogs: Model<IOrganizationLogs> = mongoose.model<IOrganizationLogs>('OrganizationLogs', OrganizationLogsSchema);


export default OrganizationLogs;