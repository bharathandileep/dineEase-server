

import mongoose, { Document, Schema, model } from 'mongoose';


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
  is_deleted: boolean;                     

  created_at: Date;
  updated_at: Date;
}


export const KitchenSchema: Schema = new Schema<IKitchen>(
  {
    kitchen_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    kitchen_status: { type: String, required: true },  
    kitchen_owner_name: { type: String, required: true },
    owner_email: { type: String, required: true },
    owner_phone_number: { type: String, required: true },
    restaurant_type: { type: String, required: true },
    kitchen_type: { 
      type: String, 
      required: true, 
      enum: ['Veg', 'Non-Veg'] 
    }, 
    kitchen_phone_number: { type: String, required: true }, 
    kitchen_document_verification: { 
      type: Boolean, 
      default: false 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
    opens_at: { type: String, required: true },  
    closes_at: { type: String, required: true }, 
    working_days: { type: [String], required: true }, 
    kitchen_image: { type: String, required: true },  
  },
  { timestamps: true }  
);
