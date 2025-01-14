import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Address document
export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;   // Reference to the User schema
  street_address: string;            // Street address
  city: string;                      // City
  state: string;                     // State
  district: string;                  // District
  pincode: string;                   // Postal code
  address_type: string;              // Type of address (Home/Work)
  created_at: Date;                  // Timestamp when the address was created
  updated_at: Date;                  // Timestamp when the address was last updated
}

// Define the Address schema
export const AddressSchema: Schema = new Schema<IAddress>(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to User schema
    street_address: { type: String, required: true }, // Street address
    city: { type: String, required: true }, // City
    state: { type: String, required: true }, // State
    district: { type: String, required: true }, // District
    pincode: { type: String, required: true }, // Postal code
    address_type: { 
      type: String, 
      required: true, 
      enum: ['Home', 'Work'] 
    }, // Address type (Home or Work)
    created_at: { type: Date, default: Date.now }, // Timestamp when the address is created
    updated_at: { type: Date, default: Date.now }, // Timestamp when the address is last updated
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Address model
const Address = mongoose.model<IAddress>('Address', AddressSchema);
export default Address;
  