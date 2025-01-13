import mongoose, { Schema, Document, Model } from 'mongoose';
import { AddressSchema } from '../../schema/address/AddressSchema';


export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  street_address: string;
  city: string;
  pincode: string;
  district: string;
  state: string;
  address_type: 'home' | 'work' | 'other';
  created_at: Date;
  updated_at: Date;
}

const Address: Model<IAddress> = mongoose.model<IAddress>('Address', AddressSchema);
export default Address;
