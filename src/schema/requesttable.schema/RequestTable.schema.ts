import mongoose, { Document, Schema, model } from 'mongoose';


export interface IRequest extends Document {
  user_id: mongoose.Types.ObjectId;          
  kitchen_id: mongoose.Types.ObjectId;      
  organization_id: mongoose.Types.ObjectId;  
  status: string;                            
  rejection_reason?: string;                 
  is_deleted: boolean;                      

  created_at: Date;                          
  updated_at: Date;                          
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


