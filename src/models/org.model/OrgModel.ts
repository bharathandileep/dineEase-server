import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganisationSchema } from '../../schema/org/OrgSchema';

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


const Organisation: Model<IOrganisation> = mongoose.model<IOrganisation>('Organisation', OrganisationSchema);
export default Organisation;
