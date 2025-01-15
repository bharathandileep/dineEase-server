import mongoose, { Document, Model } from 'mongoose';
import { KitchenFssaiCertificateDetailsSchema } from '../../schema/ffsai.schema/FfsaiSchema';

export interface IKitchenFssaiCertificateDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;        // Reference to the Kitchen schema
  ffsai_certificate_number: string;           // FSSAI certificate number
  ffsai_card_owner_name: string;              // Owner's name on the FSSAI certificate
  ffsai_certificate_image: string;            // URL or file path to the FSSAI certificate image
  expiry_date: Date;                          // Expiry date of the certificate
  is_verified: boolean;                       // Verification status (default is false)
  is_deleted: boolean;                        // Soft delete flag
  created_at: Date;                           // Timestamp when the record was created
  updated_at: Date;                           // Timestamp when the record was last updated
}
const KitchenFssaiCertificateDetails: Model<IKitchenFssaiCertificateDetails> = mongoose.model<IKitchenFssaiCertificateDetails>(
  'KitchenFssaicertificateDetails', 
  KitchenFssaiCertificateDetailsSchema
);
export default KitchenFssaiCertificateDetails;