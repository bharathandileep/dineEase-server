import mongoose, { Document, Schema, model } from 'mongoose';


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


export const KitchenPanCardDetailsSchema: Schema = new Schema<IKitchenPanCardDetails>(
  {
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, 
    pan_card_number: { 
      type: String, 
      required: true, 
      unique: true 
    }, 
    pan_card_user_name: { 
      type: String, 
      required: true 
    }, 
    pan_card_image: { 
      type: String, 
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


