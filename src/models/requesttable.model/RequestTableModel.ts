import mongoose, { Document, Model } from 'mongoose';
import { RequestSchema } from '../../schema/requesttable.schema/RequestTable.schema';

export interface IRequest extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  organization_id: mongoose.Types.ObjectId;  // Reference to the Organization schema
  status: string;                            // Accepted or Rejected status
  rejection_reason?: string;                 // Reason for rejection (optional)
  created_at: Date;                          // Timestamp when the request was created
  updated_at: Date;                          // Timestamp when the request was last updated
}
const Request : Model<IRequest> = mongoose.model<IRequest>('Request',RequestSchema)
export default Request;
