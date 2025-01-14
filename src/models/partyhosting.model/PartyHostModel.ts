import mongoose, { Schema, Document, Model } from 'mongoose';
import { PartyHostingSchema } from '../../schema/partyhosting.schema/PartyHostSchema';

// Define the interface for the Party Hosting document
export interface IPartyHosting extends Document {
  kitchen_id: mongoose.Types.ObjectId; // Reference to the Kitchen model
  venue: string; // The location where the party will take place
  date: Date; // Date of the party
  time: string; // Time of the party
  amount: number; // Amount for hosting the party
  host_name: string; // Name of the person hosting the party
  host_number: string; // Contact number of the host
  food_items: string[]; // List of food items served in the party
  image_or_poster: string; // Image or poster for the party (URL or path to file)
  payment_ref: mongoose.Types.ObjectId; // Reference to the Payment model
  created_at: Date; // Timestamp for party creation
  updated_at: Date; // Timestamp for party updates
}



const PartyHosting: Model<IPartyHosting> = mongoose.model<IPartyHosting>('PartyHosting', PartyHostingSchema);
export default PartyHosting;
