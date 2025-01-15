import mongoose, { Schema, Document, Model } from "mongoose";
import { OrganisationDocumentationSchema } from "../../schema/orgdoc.schema/OrgDocSchema";

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






const OrganisationDocumentation: Model<IOrganisationDocumentation> = mongoose.model<IOrganisationDocumentation>(
  'OrganisationDocumentation', 
  OrganisationDocumentationSchema
);

export default OrganisationDocumentation;