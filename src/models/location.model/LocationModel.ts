

import mongoose, { Document, Model } from 'mongoose';
import { LocationSchema } from '../../schema/Location.schema/Location.schema';

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


const Location: Model<ILocation> = mongoose.model<ILocation>('Location', LocationSchema);
export default Location;
