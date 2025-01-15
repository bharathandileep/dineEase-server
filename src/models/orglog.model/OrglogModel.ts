import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganizationLogsSchema } from '../../schema/orglog.schema/OrglogSchema';

export interface IOrganizationLogs extends Document {
  organization_id: mongoose.Types.ObjectId;   // Reference to the Organization schema
  login_method: string;                       // Login method (e.g., email, Google)
  login_time: Date;                           // Timestamp of organization login
  logout_time: Date;                          // Timestamp of organization logout
  google_token: string;                       // Google token if applicable
  ip_address: string;                         // IP address of the organization
  device_information: string;                 // Information about the organization's device
  location: string;                           // Location (e.g., city, country)
  created_at: Date;                           // Timestamp when the log was created
  updated_at: Date;                           // Timestamp when the log was last updated
}
const OrganizationLogs: Model<IOrganizationLogs> = mongoose.model<IOrganizationLogs>(
    'OrganizationLogs',
    OrganizationLogsSchema
  );
  
  export default OrganizationLogs;