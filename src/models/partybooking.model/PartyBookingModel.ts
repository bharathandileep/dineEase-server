import mongoose, { Document, Model } from 'mongoose';
import { PartyBookingSchema } from '../../schema/partybooking.schema/PartyBooking.schema';
 
export interface IPartyBooking extends Document {
  user_id: mongoose.Types.ObjectId;        
  organization_id: mongoose.Types.ObjectId;  
  kitchen_id: mongoose.Types.ObjectId;    
  venue_id: mongoose.Types.ObjectId;  
  total_taken_tickets_id: mongoose.Types.ObjectId;
  payment_id: mongoose.Types.ObjectId;      
  created_at: Date;                      
  updated_at: Date;                      
  is_deleted: boolean;
}
const PartyBooking = mongoose.model<IPartyBooking>('PartyBooking', PartyBookingSchema);
export default PartyBooking;
