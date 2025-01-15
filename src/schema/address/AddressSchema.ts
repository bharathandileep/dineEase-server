
  
import mongoose, { Document, Schema, model } from 'mongoose';


export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;       
  kitchen_id?: mongoose.Types.ObjectId;  
  organization_id?: mongoose.Types.ObjectId; 
  street_address: string;                
  city: string;                          
  state: string;                        
  district: string;                     
  pincode: string;                       
  country: string;                       
  landmark?: string;                    
  address_type: string;                 
  is_deleted: boolean;                   
  created_at: Date;                      
  updated_at: Date;                      
}


export const AddressSchema: Schema = new Schema<IAddress>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, 
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      default: null 
    }, 
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Organization', 
      default: null 
    }, 
    street_address: { type: String, required: true }, 
    city: { type: String, required: true }, 
    state: { type: String, required: true }, 
    district: { type: String, required: true }, 
    pincode: { type: String, required: true },
    country: { type: String, required: true }, 
    landmark: { type: String, default: null }, 
    address_type: { 
      type: String, 
      required: true, 
      enum: ['Home', 'Work'] 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);


