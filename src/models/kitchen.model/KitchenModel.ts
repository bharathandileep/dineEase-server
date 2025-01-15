

import mongoose, { Document, Model } from 'mongoose';
import { KitchenSchema } from '../../schema/kitchen.schema/KitchenSchema';

export interface IKitchen extends Document {
  kitchen_name: string;
  contact_number: string;
  kitchen_status: string;
  kitchen_owner_name: string;
  owner_email: string;
  owner_phone_number: string;
  restaurant_type: string;             
  kitchen_type: string;                
  kitchen_phone_number: string;       
  kitchen_document_verification: boolean; 
  opens_at: string;                    
  closes_at: string;                  
  working_days: string[];             
  kitchen_image: string;               
  gst_number: string;                 
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;                 

}


const Kitchen: Model<IKitchen> = mongoose.model<IKitchen>('Kitchen', KitchenSchema);
export default Kitchen;
