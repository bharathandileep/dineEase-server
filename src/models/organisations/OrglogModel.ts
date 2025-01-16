import mongoose, { Schema, Document, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IOrganizationLogs extends Document,CommonDBInterface {
  organization_id: mongoose.Types.ObjectId;  
  login_method: string;                       
  login_time: Date;                           
  logout_time: Date;                          
  google_token: string;                       
  ip_address: string;                        
  device_information: string;                
  location: string;                           
                        
}
export const OrganizationLogsSchema: Schema<IOrganizationLogs> = new Schema(
  {
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Organization', 
      required: true 
    },
    login_method: { 
      type: String, 
      required: true 
    },
    login_time: { 
      type: Date, 
      required: true 
    },
    logout_time: { 
      type: Date, 
      required: true 
    },
    google_token: { 
      type: String, 
      required: true 
    },
    ip_address: { 
      type: String, 
      required: true 
    },
    device_information: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true } 
);



const OrganizationLogs: Model<IOrganizationLogs> = mongoose.model<IOrganizationLogs>('OrganizationLogs', OrganizationLogsSchema);


export default OrganizationLogs;