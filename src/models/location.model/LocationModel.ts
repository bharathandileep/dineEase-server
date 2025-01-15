// import mongoose, { Document, Model } from 'mongoose';
// import { LocationSchema } from '../../schema/Location.schema/Location.schema';

// export interface ILocation extends Document {
//   kitchen_id: mongoose.Types.ObjectId;      // Reference to the Kitchen schema
//   address_id: mongoose.Types.ObjectId;      // Reference to the Address schema
//   delivery_area: string;                    // Delivery area description
//   created_at: Date;                         // Timestamp when the location was created
//   updated_at: Date;                         // Timestamp when the location was last updated
// }
// const Location : Model<ILocation> = mongoose.model<ILocation>('Location',LocationSchema)
// export default Location;

import mongoose, { Document, Model } from 'mongoose';
import { LocationSchema } from '../../schema/Location.schema/Location.schema';

export interface ILocation extends Document {
  kitchen_id: mongoose.Types.ObjectId;         // Reference to the Kitchen schema
  address_id: mongoose.Types.ObjectId;         // Reference to the Address schema
  organization_id: mongoose.Types.ObjectId;    // Reference to the Organization schema
  geopolitical_area: string;                   // Geopolitical area description
  location: { 
    latitude: number; 
    longitude: number; 
  };                                            // Geographic location
  delivery_area: string;                        // Delivery area description
  is_deleted: boolean;                          // Soft delete flag
  created_at: Date;                             // Timestamp when the location was created
  updated_at: Date;                             // Timestamp when the location was last updated
}

// Define the Location model
const Location: Model<ILocation> = mongoose.model<ILocation>('Location', LocationSchema);
export default Location;
