import mongoose, { Document, Model } from 'mongoose';
import { KitchenPanCardDetailsSchema } from '../../schema/pan.schema/PanSchema';



export interface IKitchenPanCardDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;      
  pan_card_number: string;                 
  pan_card_user_name: string;             
  pan_card_image: string;                 
  is_verified: boolean;                     
  is_deleted: boolean;                      
  created_at: Date;
  updated_at: Date;                        
}


const KitchenPanCardDetails: Model<IKitchenPanCardDetails> = mongoose.model<IKitchenPanCardDetails>(
  'KitchenPanCardDetails', 
  KitchenPanCardDetailsSchema
);

export default KitchenPanCardDetails;
