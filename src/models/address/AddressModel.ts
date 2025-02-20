import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface IAddress extends Document, CommonDBInterface {
  street_address: string;
  //city: string;
  //state: string;
  district: string;
  Country:mongoose.Types.ObjectId;
  City:mongoose.Types.ObjectId;
  State:mongoose.Types.ObjectId;
  pincode: string;
  //country: string;
  landmark?: string;
  address_type: "Home" | "Work";
}

export const AddressSchema: Schema<IAddress> = new Schema<IAddress>(
  {
    street_address: { type: String, required: true },
    //city: { type: String, required: true },
    //state: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    Country:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Country",
      required:true,
    },
    City:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"City",
      required:true,
    },
    State:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"State",
      required:true,
    },
    //country: { type: String, required: true },
    landmark: { type: String, default: null },
    address_type: { type: String },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);  

const Address: Model<IAddress> = mongoose.model<IAddress>(
  "Address",
  AddressSchema
);
export default Address;
