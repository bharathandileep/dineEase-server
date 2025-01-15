


import mongoose, { Document, Schema, model } from 'mongoose';


export interface IOrganization extends Document {
  user_id: mongoose.Types.ObjectId;         
  address_id: mongoose.Types.ObjectId;      
  name: string;                             
  register_number: string;                 
  location: string;                         
  contact_number: string;                  
  email: string;                           
  no_of_employees: number;                 
  is_deleted: boolean;                     
  created_at: Date;                         
  updated_at: Date;                         
}

export const OrganizationSchema: Schema<IOrganization> = new Schema<IOrganization>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, 
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    }, 
    register_number: {
      type: String,
      required: true,
      unique: true,
    }, 
    location: {
      type: String,
      required: true,
    }, 
    contact_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    no_of_employees: {
      type: Number,
      required: true,
    }, 
    is_deleted: {
      type: Boolean,
      default: false,
    }, 
  },
  { timestamps: true } 
);




