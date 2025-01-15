import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserLogsSchema } from '../../schema/userlogs.schema/UserlogsSchema';

export interface IUserLogs extends Document {
  user_id: mongoose.Types.ObjectId;       // Reference to the User schema
  login_method: string;                   // Login method (e.g., email, Google, Facebook)
  login_time: Date;                       // Timestamp of user login
  logout_time: Date;                      // Timestamp of user logout
  google_token: string;                   // Google token if applicable
  ip_address: string;                     // IP address of the user
  device_information: string;             // Information about the user's device
  location: string;                       // User's location (e.g., city, country)
  created_at: Date;                       // Timestamp when the log was created
  updated_at: Date;                       // Timestamp when the log was last updated
}
const UserLogs: Model<IUserLogs> = mongoose.model<IUserLogs>('UserLogs', UserLogsSchema);
export default UserLogs;