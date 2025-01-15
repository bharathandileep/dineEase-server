import mongoose, { Schema, Document, Model } from 'mongoose';
import { PartyHostingSchema } from '../../schema/partyhosting.schema/PartyHostSchema';
 
 
export interface IPartyHosting extends Document {
  kitchen_id: mongoose.Types.ObjectId;  
  venue: string;                        
  date: Date;                           
  time: string;                         
  amount: number;                      
  host_name: string;                    
  host_number: string;                  
  food_items: string[];              
  image_or_poster: string;              
  payment_ref: mongoose.Types.ObjectId; 
  maximum_capacity: number;            
  total_bookings: number;              
  contact_info: {                     
    email: string;
    address: string;
  };
  created_at: Date;                     
  updated_at: Date;                   
}
 
 
const PartyHosting: Model<IPartyHosting> = mongoose.model<IPartyHosting>('PartyHosting', PartyHostingSchema);
export default PartyHosting;
 
