


import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";





export interface IKitchenDocumentation extends Document,CommonDBInterface{
  kitchen_id: mongoose.Types.ObjectId;          
  license_type: string;                         
  issue_date: Date;                              
  issuing_authority: string;                     
  document_image: string;                       

}
export const KitchenDocumentationSchema: Schema<IKitchenDocumentation> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true
    },
    
    license_type: { type: String, required: true },
    issue_date: { type: Date, required: true },
    issuing_authority: { type: String, required: true },
    document_image: { type: String, required: true }, 
  },
  { timestamps: true }
);



const KitchenDocumentation: Model<IKitchenDocumentation> = mongoose.model<IKitchenDocumentation>(
  'KitchenDocumentation', 
  KitchenDocumentationSchema
);


export default KitchenDocumentation;
