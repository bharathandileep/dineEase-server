// import mongoose, { Document, Model } from 'mongoose';
// import { KitchenSchema } from '../../schema/kitchen.schema/KitchenSchema';


// export interface IKitchen extends Document {
//   kitchen_name: string;
//   //kitchen_address: mongoose.Types.ObjectId;  // Reference to Address table
//   //location: mongoose.Types.ObjectId;         // Reference to Address table
//   contact_number: string;
//   kitchen_status: string;
//   kitchen_owner_name: string;
//   owner_email: string;
//   owner_phone_number: string;
//   restaurant_type: string;
//   opens_at: string;  // Time in string format (e.g., '09:00 AM')
//   closes_at: string; // Time in string format (e.g., '09:00 PM')
//   working_days: string[];  // Array of working days (e.g., ['Monday', 'Tuesday'])
//   kitchen_image: string;   // URL or file path to the kitchen image
//   gst_number: string;      // GST number for the kitchen
//   created_at: Date;
//   updated_at: Date;
// }
// const Kitchen : Model<IKitchen>=mongoose.model<IKitchen>('Kitchen', KitchenSchema);
// export default Kitchen;


import mongoose, { Document, Model } from 'mongoose';
import { KitchenSchema } from '../../schema/kitchen.schema/KitchenSchema';

export interface IKitchen extends Document {
  kitchen_name: string;
  contact_number: string;
  kitchen_status: string;
  kitchen_owner_name: string;
  owner_email: string;
  owner_phone_number: string;
  restaurant_type: string;             // Restaurant type (e.g., 'Fine Dining', 'Cafe')
  kitchen_type: string;                // Veg or Non-Veg
  kitchen_phone_number: string;        // Additional kitchen phone number
  kitchen_document_verification: boolean; // Whether documents are verified
  opens_at: string;                    // Time in string format (e.g., '09:00 AM')
  closes_at: string;                   // Time in string format (e.g., '09:00 PM')
  working_days: string[];              // Array of working days (e.g., ['Monday', 'Tuesday'])
  kitchen_image: string;               // URL or file path to the kitchen image
  gst_number: string;                  // GST number for the kitchen
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;                 

}

// Define the Kitchen model
const Kitchen: Model<IKitchen> = mongoose.model<IKitchen>('Kitchen', KitchenSchema);
export default Kitchen;
