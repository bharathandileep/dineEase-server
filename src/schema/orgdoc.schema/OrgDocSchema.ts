import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IKitchenDocumentation extends Document {
  kitchen_id: mongoose.Types.ObjectId;
  license_type: string; 
  issue_date: Date; 
  issuing_authority: string; 
  document_image: string; 
  is_deleted: boolean;                     
  created_at: Date; 
  updated_at: Date; 
}


export const KitchenDocumentationSchema: Schema<IKitchenDocumentation> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    },
    license_type: { type: String, required: true },
    issue_date: { type: Date, required: true },
    issuing_authority: { type: String, required: true },
    document_image: { type: String, required: true }, 
  },
  
  { timestamps: true }
);

