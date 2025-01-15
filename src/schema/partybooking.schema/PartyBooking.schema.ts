import mongoose, { Document, Schema, model } from "mongoose";
 
// Define an interface for the PartyBooking document
export interface IPartyBooking extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User schema
  organization_id: mongoose.Types.ObjectId; // Reference to the Organization schema
  kitchen_id: mongoose.Types.ObjectId; // Reference to the Kitchen schema
  venue_id: mongoose.Types.ObjectId; // Reference to the PartyHosting schema
  total_taken_tickets_id: mongoose.Types.ObjectId; // Reference to the PartyHosting schema
  payment_id: mongoose.Types.ObjectId; // Reference to the Payment schema
  created_at: Date; // Timestamp when the booking was created
  updated_at: Date; // Timestamp when the booking was last updated
}
 
// Define the PartyBooking schema
export const PartyBookingSchema: Schema = new Schema<IPartyBooking>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User schema
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    }, // Reference to Organization schema
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    }, // Reference to Kitchen schema
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
    }, // Reference to Payment schema
    created_at: { type: Date, default: Date.now }, // Timestamp for creation
    updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the PartyBooking model
const PartyBooking = mongoose.model<IPartyBooking>(
  "PartyBooking",
  PartyBookingSchema
);
export default PartyBooking;
