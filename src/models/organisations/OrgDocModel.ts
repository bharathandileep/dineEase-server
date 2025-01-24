import mongoose, { Schema, Document, Model } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";


export interface IOrganisationDocumentation extends Document,CommonDBInterface{
  organization_id: mongoose.Types.ObjectId; 
  license_type: string;
  issue_date: Date;
  issuing_authority: string;
  document_image: string;

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





const OrganisationDocumentation: Model<IOrganisationDocumentation> = mongoose.model<IOrganisationDocumentation>(
  'OrganisationDocumentation', 
  OrganisationDocumentationSchema
);

export default OrganisationDocumentation;