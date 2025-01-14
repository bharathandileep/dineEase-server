import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrganisationDocumentation extends Document {
  organisation_id: mongoose.Types.ObjectId; 
  license_type: string; 
  issue_date: Date; 
  issuing_authority: string; 
  document_image: string; 
}


const OrganisationDocumentationSchema: Schema<IOrganisationDocumentation> = new Schema(
  {
    organisation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation", 
      required: true,
    },
    license_type: { type: String},
    issue_date: { type: Date},
    issuing_authority: { type: String, required: true },
    document_image: { type: String, required: true }, 
  },
  { timestamps: true }
);


const OrganisationDocumentation: Model<IOrganisationDocumentation> = mongoose.model<IOrganisationDocumentation>(
  "OrganisationDocumentation",
  OrganisationDocumentationSchema
);

export default OrganisationDocumentation;
