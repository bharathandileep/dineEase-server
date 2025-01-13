import mongoose, { Document, Model } from 'mongoose';
import { PartyBookingSchema } from '../../schema/partybooking.schema/PartyBooking.schema';

export interface IPartyBooking extends Document {
  user_id: mongoose.Types.ObjectId;          // Reference to the User schema
  organization_id: mongoose.Types.ObjectId;  // Reference to the Organization schema
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  venue_id: mongoose.Types.ObjectId;         // Reference to the PartyHosting schema
  payment_id: mongoose.Types.ObjectId;       // Reference to the Payment schema
  created_at: Date;                          // Timestamp when the booking was created
  updated_at: Date;                          // Timestamp when the booking was last updated
}
const PartyBooking = mongoose.model<IPartyBooking>('PartyBooking', PartyBookingSchema);
export default PartyBooking;