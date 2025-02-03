import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IKitchenFssaiCertificateDetails extends Document,CommonDBInterface{
  kitchen_id: mongoose.Types.ObjectId;        
  ffsai_certificate_number: string;           
  ffsai_card_owner_name: string;              
  ffsai_certificate_image: string;            
  expiry_date: Date;                          
  is_verified: boolean;                      
                     
}
export const KitchenFssaiCertificateDetailsSchema: Schema = new Schema<IKitchenFssaiCertificateDetails>(
  {
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, 
    ffsai_certificate_number: { 
      type: String, 
      required: true, 
      unique: true 
    }, 
    ffsai_card_owner_name: { 
      type: String, 
      required: true 
    }, 
    ffsai_certificate_image: { 
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

const FssaiCertificateDetails: Model<IKitchenFssaiCertificateDetails> = mongoose.model<IKitchenFssaiCertificateDetails>(
  'KitchenFssaicertificateDetails', 
  KitchenFssaiCertificateDetailsSchema
);
export default FssaiCertificateDetails;