import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganizationLogsSchema } from '../../schema/kitchenlog.schema/KitchenlogSchema';

export interface IOrganizationLogs extends Document {
  kitchen_id: mongoose.Types.ObjectId;        
  login_method: string;                       
  login_time: Date;                           
  logout_time: Date;                         
  google_token: string;                       
  ip_address: string;                        
  device_information: string;                
  location: string;                           
  created_at: Date;                           
  updated_at: Date;                           
   is_deleted: boolean;
}
const OrganizationLogs: Model<IOrganizationLogs> = mongoose.model<IOrganizationLogs>(
    'OrganizationLogs',
    OrganizationLogsSchema
  );
  
  export default OrganizationLogs;