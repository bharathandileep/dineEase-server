import mongoose, { Schema, Document, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';

 
 
export interface IPartyHosting extends Document,CommonDBInterface {
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
                 
}
 
export const PartyHostingSchema: Schema<IPartyHosting> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',  
      required: true
    },
    venue: { type: String, required: true }, 
    date: { type: Date, required: true },    
    time: { type: String, required: true },   
    amount: { type: Number, required: true }, 
    host_name: { type: String, required: true }, 
    host_number: { type: String, required: true },
    food_items: { type: [String], required: true }, 
    image_or_poster: { type: String, required: true }, 
    payment_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',  
      required: true
    },
    maximum_capacity: { type: Number, required: true }, 
    total_bookings: { type: Number, default: 0 }, 
    contact_info: {  // Contact information
      email: { type: String, required: true },
      address: { type: String, required: true }
    }
  },
  { timestamps: true } 
);
const PartyHosting: Model<IPartyHosting> = mongoose.model<IPartyHosting>('PartyHosting', PartyHostingSchema);
export default PartyHosting;
 
