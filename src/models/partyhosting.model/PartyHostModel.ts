import mongoose, { Schema, Document, Model } from 'mongoose';
import { PartyHostingSchema } from '../../schema/partyhosting.schema/PartyHostSchema';
 
 
export interface IPartyHosting extends Document {
  kitchen_id: mongoose.Types.ObjectId;  // Reference to the Kitchen model
  venue: string;                        // Venue for the hosting
  date: Date;                           // Date of the event
  time: string;                         // Time of the event
  amount: number;                       // Amount for hosting
  host_name: string;                    // Host name
  host_number: string;                  // Host's phone number
  food_items: string[];                 // List of food items available for the event
  image_or_poster: string;              // Image or poster related to the event
  payment_ref: mongoose.Types.ObjectId; // Reference to the Payment model
  maximum_capacity: number;             // Maximum capacity of the venue (e.g., number of guests)
  total_bookings: number;               // Total number of bookings made for this event
  contact_info: {                       // Additional contact information
    email: string;
    address: string;
  };
  created_at: Date;                     // Creation timestamp
  updated_at: Date;                     // Last updated timestamp
}
 
 
const PartyHosting: Model<IPartyHosting> = mongoose.model<IPartyHosting>('PartyHosting', PartyHostingSchema);
export default PartyHosting;
 
