import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserLogsSchema } from '../../schema/userlogs.schema/UserlogsSchema';

export interface IUserLogs extends Document {
  user_id: mongoose.Types.ObjectId;      
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

const UserLogs: Model<IUserLogs> = mongoose.model<IUserLogs>('UserLogs', UserLogsSchema);


export default UserLogs;
