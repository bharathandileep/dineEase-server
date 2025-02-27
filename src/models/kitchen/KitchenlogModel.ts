import mongoose, { Schema, Document, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IOrganizationLogs extends Document,CommonDBInterface {
  kitchen_id: mongoose.Types.ObjectId;        
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
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true,
    }, 
    login_method: {
      type: String,
      required: true,
      enum: ['email', 'google', 'facebook', 'apple'], 
    }, 
    login_time: {
      type: Date,
      required: true,
    }, 
    logout_time: {
      type: Date,
      required: false,
    },
    google_token: {
      type: String,
      required: false,
    }, 
    ip_address: {
      type: String,
      required: true,
    }, 
    device_information: {
      type: String,
      required: true,
    }, 
    location: {
      type: String,
      required: true,
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);


const OrganizationLogs: Model<IOrganizationLogs> = mongoose.model<IOrganizationLogs>(
    'OrganizationLogs',
    OrganizationLogsSchema
  );
  
  export default OrganizationLogs;