import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';

 
export interface IPartyBooking extends Document,CommonDBInterface {
  user_id: mongoose.Types.ObjectId;        
  organization_id: mongoose.Types.ObjectId;  
  kitchen_id: mongoose.Types.ObjectId;    
  venue_id: mongoose.Types.ObjectId;  
  total_taken_tickets_id: mongoose.Types.ObjectId;
  payment_id: mongoose.Types.ObjectId;      

}
export const PartyBookingSchema: Schema = new Schema<IPartyBooking>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    }, 
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    }, 
    venue_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PartyHosting",
      required: true,
    },
    total_taken_tickets_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PartyHosting",
      required: true,
    },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    }, 
   
  },
  { timestamps: true } 
);
 

const PartyBooking = mongoose.model<IPartyBooking>('PartyBooking', PartyBookingSchema);
export default PartyBooking;
