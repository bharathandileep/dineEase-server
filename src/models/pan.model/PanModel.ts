import mongoose, { Document, Model } from 'mongoose';
import { KitchenPanCardDetailsSchema } from '../../schema/pan.schema/PanSchema';


// Define an interface for the KitchenPanCardDetails document
export interface IKitchenPanCardDetails extends Document {
  kitchen_id: mongoose.Types.ObjectId;      // Reference to the Kitchen schema
  pan_card_number: string;                 // PAN card number
  pan_card_user_name: string;              // Name on the PAN card
  pan_card_image: string;                  // URL or file path to the PAN card image
  is_verified: boolean;                     // Verification status (default is false)
  is_deleted: boolean;                      // Soft delete flag
  created_at: Date;                        // Timestamp when the record was created
  updated_at: Date;                        // Timestamp when the record was last updated
}

// Define the KitchenPanCardDetails schema
const KitchenPanCardDetails: Model<IKitchenPanCardDetails> = mongoose.model<IKitchenPanCardDetails>(
  'KitchenPanCardDetails', 
  KitchenPanCardDetailsSchema
);

export default KitchenPanCardDetails;
