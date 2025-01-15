import mongoose, { Document, Model } from 'mongoose';
import { AddressSchema } from '../../schema/address.schema/AddressSchema';

export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;       
  kitchen_id?: mongoose.Types.ObjectId;
  organization_id?: mongoose.Types.ObjectId; 
  street_address: string;                
  city: string;                          
  state: string;                         
  district: string;                      
  pincode: string;                      
  country: string;                       
  landmark?: string;                     
  address_type: string;                  
  is_deleted: boolean;                   
  created_at: Date;                      
  updated_at: Date;                      
}

const Address : Model<IAddress> = mongoose.model<IAddress>('Address',AddressSchema)
export default Address;
