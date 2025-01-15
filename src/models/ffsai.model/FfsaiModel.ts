import mongoose, { Document, Model } from 'mongoose';
import { KitchenFssaiCertificateDetailsSchema } from '../../schema/ffsai.schema/FfsaiSchema';

export interface IKitchenFssaiCertificateDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;        
  ffsai_certificate_number: string;           
  ffsai_card_owner_name: string;              
  ffsai_certificate_image: string;            
  expiry_date: Date;                          
  is_verified: boolean;                      
  is_deleted: boolean;                       
  created_at: Date;                           
  updated_at: Date;                          
}
const KitchenFssaiCertificateDetails: Model<IKitchenFssaiCertificateDetails> = mongoose.model<IKitchenFssaiCertificateDetails>(
  'KitchenFssaicertificateDetails', 
  KitchenFssaiCertificateDetailsSchema
);
export default KitchenFssaiCertificateDetails;