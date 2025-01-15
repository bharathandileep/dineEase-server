import mongoose, { Schema, Document, Model } from 'mongoose';


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


export const UserLogsSchema: Schema<IUserLogs> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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



