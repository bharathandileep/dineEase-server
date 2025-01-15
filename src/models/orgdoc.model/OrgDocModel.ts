import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrganisationDocumentation extends Document {
  organisation_id: mongoose.Types.ObjectId; 
  license_type: string; 
  issue_date: Date; 
  issuing_authority: string; 
  document_image: string;
  is_deleted: boolean;  
}





const OrganisationDocumentation: Model<IOrganisationDocumentation> = mongoose.model<IOrganisationDocumentation>(
  "OrganisationDocumentation",
  OrganisationDocumentationSchema
);

export default OrganisationDocumentation;
