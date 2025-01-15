

import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IOrganisationDocumentation extends Document {
  organization_id: mongoose.Types.ObjectId; 
  license_type: string;
  issue_date: Date;
  issuing_authority: string;
  document_image: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}


export const OrganisationDocumentationSchema: Schema<IOrganisationDocumentation> = new Schema(
  {
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization', 
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

