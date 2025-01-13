import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Request document
export interface IRequest extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  organization_id: mongoose.Types.ObjectId;  // Reference to the Organization schema
  status: string;                            // Accepted or Rejected status
  rejection_reason?: string;                 // Reason for rejection (optional)
  created_at: Date;                          // Timestamp when the request was created
  updated_at: Date;                          // Timestamp when the request was last updated
}

// Define the Request schema
export const RequestSchema: Schema = new Schema<IRequest>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to User schema
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, // Reference to Kitchen schema
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Organization', 
      required: true 
    }, // Reference to Organization schema
    status: { 
      type: String, 
      required: true, 
      enum: ['Accepted', 'Rejected'] 
    }, // Status field (Accepted or Rejected)
    rejection_reason: { 
      type: String, 
      required: function() { return this.status === 'Rejected'; } 
    }, // Reason for rejection, required only if the status is "Rejected"
    created_at: { type: Date, default: Date.now }, // Timestamp for creation
    updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Request model
const Request = mongoose.model<IRequest>('Request', RequestSchema);
export default Request;

