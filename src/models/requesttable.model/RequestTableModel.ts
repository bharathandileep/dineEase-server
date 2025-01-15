import mongoose, { Document, Model } from 'mongoose';
import { RequestSchema } from '../../schema/requesttable.schema/RequestTable.schema';

export interface IRequest extends Document {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;      
  organization_id: mongoose.Types.ObjectId; 
  status: string;                            
  rejection_reason?: string;                 
  created_at: Date;    
  is_deleted: boolean;                      
  updated_at: Date;                          
}
const Request : Model<IRequest> = mongoose.model<IRequest>('Request',RequestSchema)
export default Request;
