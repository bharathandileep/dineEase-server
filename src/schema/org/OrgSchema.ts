import mongoose, { Schema, Document, Model } from 'mongoose';


// Define the interface for the Organisation document
export interface IOrganisation extends Document {
  name: string;
  address: string;
  register_number: string;
  location: string; // Google Maps link
  contact_number: string;
  status: boolean;
  email: string;
  no_of_employees: number;
  tax_identification_number: {
    gst: string;
    vat: string;
  };
  bank_details: {
    account_number: string;
    ifsc_code: string;
  };
  created_at: Date;
  updated_at: Date;
}

// Define the Organisation schema
export const OrganisationSchema: Schema<IOrganisation> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    register_number: { type: String, unique: true, required: true },
    location: { type: String, required: true }, // Google Maps link
    contact_number: { type: String, required: true },
    status: { type: Boolean, default: true },
    email: { type: String, unique: true, required: true },
    no_of_employees: { type: Number, required: true },
    tax_identification_number: {
      gst: { type: String, required: true },
      vat: { type: String, required: true }
    },
    bank_details: {
      account_number: { type: String, required: true },
      ifsc_code: { type: String, required: true }
    }
  },
  { timestamps: true }
);

