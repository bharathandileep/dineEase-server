import mongoose, { Document, Schema, model } from "mongoose";
 

export interface IPartyBooking extends Document {
  user_id: mongoose.Types.ObjectId; 
  organization_id: mongoose.Types.ObjectId; 
  kitchen_id: mongoose.Types.ObjectId; 
  venue_id: mongoose.Types.ObjectId; 
  total_taken_tickets_id: mongoose.Types.ObjectId;
  payment_id: mongoose.Types.ObjectId; 
  created_at: Date; 
  updated_at: Date; 
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
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now }, 
  },
  { timestamps: true } 
);
 

const PartyBooking = mongoose.model<IPartyBooking>(
  "PartyBooking",
  PartyBookingSchema
);
export default PartyBooking;
