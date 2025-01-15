import mongoose, { Document, Schema, Model } from 'mongoose';


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


