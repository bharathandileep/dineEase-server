


import mongoose, { Document, Model } from "mongoose";
import { KitchenDocumentationSchema } from "../../schema/kitchendoc.schema/KitchDocSchema";




export interface IKitchenDocumentation extends Document {
  kitchen_id: mongoose.Types.ObjectId;          
  license_type: string;                         
  issue_date: Date;                              
  issuing_authority: string;                     
  document_image: string;                       
  is_deleted: boolean;
}


const KitchenDocumentation: Model<IKitchenDocumentation> = mongoose.model<IKitchenDocumentation>(
  'KitchenDocumentation', 
  KitchenDocumentationSchema
);


export default KitchenDocumentation;
