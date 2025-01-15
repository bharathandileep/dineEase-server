


import mongoose, { Document, Schema, model } from 'mongoose';


export interface ILocation extends Document {
  kitchen_id: mongoose.Types.ObjectId;          
  address_id: mongoose.Types.ObjectId;          
  organization_id: mongoose.Types.ObjectId;     
  geopolitical_area: string;                   
  location: { 
    latitude: number; 
    longitude: number; 
  };                                             
  delivery_area: string;
  is_deleted: boolean;                           
  created_at: Date;                             
  updated_at: Date;                             
}


export const LocationSchema: Schema = new Schema<ILocation>(
  {
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, 
    address_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Address', 
      required: true 
    },
    organization_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Organization', 
      required: true 
    }, 
    geopolitical_area: { 
      type: String, 
      required: true 
    },
    location: { 
      latitude: { type: Number, required: true }, 
      longitude: { type: Number, required: true } 
    },
    delivery_area: { 
      type: String, 
      required: true 
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);



