import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IKitchenGstCertificateDetails extends Document,CommonDBInterface {
  kitchen_id: mongoose.Types.ObjectId;        
  gst_number: string;                         
  gst_certificate_image: string;               
  expiry_date: Date;                           
  is_verified: boolean;                        
                       
}
export const KitchenGstCertificateDetailsSchema: Schema = new Schema<IKitchenGstCertificateDetails>(
  {
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, 
    gst_number: { 
      type: String, 
      required: true, 
      unique: true 
    }, 
    gst_certificate_image: { 
      type: String, 
      required: true 
    }, 
    expiry_date: { 
      type: Date, 
      required: true 
    }, 
    is_verified: { 
      type: Boolean, 
      default: false 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);



const KitchenGstCertificateDetails: Model<IKitchenGstCertificateDetails> = mongoose.model<IKitchenGstCertificateDetails>(
  'KitchenGstCertificateDetails', 
  KitchenGstCertificateDetailsSchema
);
export default KitchenGstCertificateDetails;