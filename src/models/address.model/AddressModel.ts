import mongoose, { Document, Model } from 'mongoose';
import { AddressSchema } from '../../schema/address.schema/AddressSchema';

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
const Address : Model<IAddress> = mongoose.model<IAddress>('Address',AddressSchema)
export default Address;
