// import mongoose, { Schema, Document, Model } from 'mongoose';
// import { OrganisationSchema } from '../../schema/org.schema/OrgSchema';

// // Define the interface for the Organisation document
// export interface IOrganisation extends Document {
//   name: string;
//   address: string;
//   register_number: string;
//   location: string; // Google Maps link
//   contact_number: string;
//   status: boolean;
//   email: string;
//   no_of_employees: number;
//   tax_identification_number: {
//     gst: string;
//     vat: string;
//   };
//   bank_details: {
//     account_number: string;
//     ifsc_code: string;
//   };
//   created_at: Date;
//   updated_at: Date;
// }


// const Organisation: Model<IOrganisation> = mongoose.model<IOrganisation>('Organisation', OrganisationSchema);
// export default Organisation;

import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrganizationSchema } from '../../schema/org.schema/OrgSchema';

// Define the interface for the Organisation document
export interface IOrganisation extends Document {
  user_id: mongoose.Types.ObjectId;         // Reference to the User schema
  address_id: mongoose.Types.ObjectId;      // Reference to the Address schema
  name: string;                             // Organization name
  register_number: string;                  // Unique registration number
  location: string;                         // Google Maps link or location description
  contact_number: string;                   // Contact number of the organization
  email: string;                            // Email of the organization
  no_of_employees: number;                  // Number of employees in the organization
  is_deleted: boolean;                      // Soft delete flag
  created_at: Date;                         // Timestamp when the record was created
  updated_at: Date;                         // Timestamp when the record was last updated
}



// Create and export the Organisation model
const Organisation: Model<IOrganisation> = mongoose.model<IOrganisation>('Organisation', OrganizationSchema);
export default Organisation;
