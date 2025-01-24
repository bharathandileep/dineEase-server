import mongoose, { Schema, Document } from "mongoose";

export interface IUserLogs extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  login_method: string;
  login_time: Date;
  logout_time?: Date;
  google_token?: string;
  ip_address: string;
  device_information: string;
  location: string;
  is_deleted: boolean;
}


const UserLogsSchema: Schema<IUserLogs> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    login_method: {
      type: String,
      required: true,
    },
    login_time: {
      type: Date,
      default: Date.now,  
    },
    logout_time: {
      type: Date,
    },
    ip_address: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v),
        message: props => `${props.value} is not a valid IP address!`,
      },
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
      default: false,
    },
  },
  { timestamps: true }
);

export const UserLogsModel = mongoose.model<IUserLogs>("UserLogs", UserLogsSchema);
