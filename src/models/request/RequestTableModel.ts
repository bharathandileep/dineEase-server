import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IRequest extends Document,CommonDBInterface {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;      
  organization_id: mongoose.Types.ObjectId; 
  status: string;                            
  rejection_reason?: string;                 
                        
}
export const RequestSchema: Schema = new Schema<IRequest>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    },
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Organization', 
      required: true 
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['Accepted', 'Rejected'] 
    }, 
    rejection_reason: { 
      type: String, 
      required: function() { return this.status === 'Rejected'; } 
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);

const Request : Model<IRequest> = mongoose.model<IRequest>('Request',RequestSchema)
export default Request;

