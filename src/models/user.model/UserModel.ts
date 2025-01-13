import mongoose, { Document, Model } from 'mongoose';
import { UserSchema } from '../../schema/user.schema/UserSchema';


export interface IUser extends Document {
    full_name: string;
    username: string;
    email: string;
    phone_number: string;
    profile_photo?: string;
    is_deleted: boolean;
    
    created_at: Date;
    updated_at: Date;
  }
  

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
