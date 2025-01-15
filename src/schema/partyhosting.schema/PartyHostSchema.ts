import mongoose, { Schema, Document, Model } from 'mongoose';
 
// Define the interface for the PartyHosting document
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
 
// Define the PartyHosting schema
export const PartyHostingSchema: Schema<IPartyHosting> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',  // Reference to the Kitchen model
      required: true
    },
    venue: { type: String, required: true },  // Venue name
    date: { type: Date, required: true },    // Date of the event
    time: { type: String, required: true },   // Time of the event
    amount: { type: Number, required: true }, // Amount for hosting
    host_name: { type: String, required: true }, // Host's name
    host_number: { type: String, required: true }, // Host's phone number
    food_items: { type: [String], required: true }, // List of food items for the event
    image_or_poster: { type: String, required: true }, // Image or poster URL
    payment_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',  // Reference to the Payment model
      required: true
    },
    maximum_capacity: { type: Number, required: true }, // Maximum capacity for the event
    total_bookings: { type: Number, default: 0 }, // Total number of bookings, default to 0
    contact_info: {  // Contact information
      email: { type: String, required: true },
      address: { type: String, required: true }
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the PartyHosting model
const PartyHosting: Model<IPartyHosting> = mongoose.model<IPartyHosting>('PartyHosting', PartyHostingSchema);
export default PartyHosting;
 
