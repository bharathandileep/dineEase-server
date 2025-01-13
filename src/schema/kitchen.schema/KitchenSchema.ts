import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Kitchen document
export interface IKitchen extends Document {
  kitchen_name: string;
//   kitchen_address: mongoose.Types.ObjectId;  // Reference to Address table
//   location: mongoose.Types.ObjectId;         // Reference to Address table
  contact_number: string;
  kitchen_status: string;
  kitchen_owner_name: string;
  owner_email: string;
  owner_phone_number: string;
  restaurant_type: string;
  opens_at: string;  // Time in string format (e.g., '09:00 AM')
  closes_at: string; // Time in string format (e.g., '09:00 PM')
  working_days: string[];  // Array of working days (e.g., ['Monday', 'Tuesday'])
  kitchen_image: string;   // URL or file path to the kitchen image
  //gst_number: string;      // GST number for the kitchen
  created_at: Date;
  updated_at: Date;
}

// Define the Kitchen schema
export const KitchenSchema: Schema = new Schema<IKitchen>(
  {
    kitchen_name: { type: String, required: true },
    // kitchen_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    // location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    contact_number: { type: String, required: true },
    kitchen_status: { type: String, required: true },  // For example: 'Active', 'Closed', etc.
    kitchen_owner_name: { type: String, required: true },
    owner_email: { type: String, required: true },
    owner_phone_number: { type: String, required: true },
    restaurant_type: { type: String, required: true },
    opens_at: { type: String, required: true },  // Opening time
    closes_at: { type: String, required: true }, // Closing time
    working_days: { type: [String], required: true },  // e.g., ['Monday', 'Tuesday']
    kitchen_image: { type: String, required: true },  // URL or file path
    //gst_number: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Create and export the Kitchen model
const Kitchen = mongoose.model<IKitchen>('Kitchen', KitchenSchema);
export default Kitchen;

