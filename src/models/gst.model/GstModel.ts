import mongoose, { Document, Model } from 'mongoose';
import { KitchenPanCardDetailsSchema } from '../../schema/pan.schema/PanSchema';

export interface IKitchenGstCertificateDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;        
  gst_number: string;                         
  gst_certificate_image: string;               
  expiry_date: Date;                           
  is_verified: boolean;                        
  is_deleted: boolean;                        
  created_at: Date;
  updated_at: Date;                          
}
const KitchenGstCertificateDetails: Model<IKitchenGstCertificateDetails> = mongoose.model<IKitchenGstCertificateDetails>(
  'KitchenGstCertificateDetails', 
  KitchenPanCardDetailsSchema
);
export default KitchenGstCertificateDetails;