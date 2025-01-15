import mongoose, { Document, Model } from 'mongoose';
import { KitchenPanCardDetailsSchema } from '../../schema/pan.schema/PanSchema';

export interface IKitchenGstCertificateDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;        // Reference to the Kitchen schema
  gst_number: string;                          // GST number
  gst_certificate_image: string;               // URL or file path to the GST certificate image
  expiry_date: Date;                           // Expiry date of the GST certificate
  is_verified: boolean;                        // Verification status (default is false)
  is_deleted: boolean;                         // Soft delete flag
  created_at: Date;                            // Timestamp when the record was created
  updated_at: Date;                            // Timestamp when the record was last updated
}
const KitchenGstCertificateDetails: Model<IKitchenGstCertificateDetails> = mongoose.model<IKitchenGstCertificateDetails>(
  'KitchenGstCertificateDetails', 
  KitchenPanCardDetailsSchema
);
export default KitchenGstCertificateDetails;