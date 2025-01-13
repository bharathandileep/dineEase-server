import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Location document
export interface ILocation extends Document {
  kitchen_id: mongoose.Types.ObjectId;      // Reference to the Kitchen schema
  address_id: mongoose.Types.ObjectId;      // Reference to the Address schema
  delivery_area: string;                    // Delivery area description
  created_at: Date;                         // Timestamp when the location was created
  updated_at: Date;                         // Timestamp when the location was last updated
}

// Define the Location schema
export const LocationSchema: Schema = new Schema<ILocation>(
  {
    kitchen_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Kitchen', 
      required: true 
    }, // Reference to Kitchen schema
    address_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Address', 
      required: true 
    }, // Reference to Address schema
    delivery_area: { 
      type: String, 
      required: true 
    }, // Delivery area description
    created_at: { type: Date, default: Date.now }, // Timestamp for creation
    updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Location model
const Location = mongoose.model<ILocation>('Location', LocationSchema);
export default Location;
