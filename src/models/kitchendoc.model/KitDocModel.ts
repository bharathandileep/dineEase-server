// import mongoose, { Schema, Document, Model } from "mongoose";
// import { KitchenDocumentationSchema } from "../../schema/orgdoc.schema/OrgDocSchema";


// export interface IKitchenDocumentation extends Document {
//   kitchen_id: mongoose.Types.ObjectId;
//   license_type: string; 
//   issue_date: Date; 
//   issuing_authority: string; 
//   document_image: string;
// }






// const KitchenDocumentation: Model<IKitchenDocumentation> = mongoose.model<IKitchenDocumentation>(
//   'KitchenDocumentation', 
//   KitchenDocumentationSchema
// );

// export default KitchenDocumentation;


import mongoose, { Document, Model } from "mongoose";
import { KitchenDocumentationSchema } from "../../schema/kitchendoc.schema/KitchDocSchema";

// Assuming the KitchenDocumentationSchema is imported correctly from the path.


// Define the interface for KitchenDocumentation document
export interface IKitchenDocumentation extends Document {
  kitchen_id: mongoose.Types.ObjectId;          // Reference to the Kitchen schema
  license_type: string;                          // Type of the license
  issue_date: Date;                              // Date the license was issued
  issuing_authority: string;                     // Authority that issued the license
  document_image: string;                        // Image or file path for the document
  // is_deleted: boolean;
}


const KitchenDocumentation: Model<IKitchenDocumentation> = mongoose.model<IKitchenDocumentation>(
  'KitchenDocumentation', 
  KitchenDocumentationSchema
);

// Export the model for use in other parts of the application
export default KitchenDocumentation;
