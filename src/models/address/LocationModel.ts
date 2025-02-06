import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  prepared_by_id: mongoose.Types.ObjectId;
  entity_type: 'Kitchen' | 'Organization' | 'User';
  address_id: mongoose.Types.ObjectId;
  geopolitical_area: string;
  location: {
    latitude: number;
    longitude: number;
  };
  delivery_area: string;
  is_deleted: boolean;
}

export const LocationSchema: Schema = new Schema<ILocation>(
  {
    prepared_by_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      refPath: 'entity_type' 
    }, 
    entity_type: { 
      type: String, 
      required: true, 
      enum: ['Kitchen', 'Organization', 'User'] 
    }, 
    address_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Address', 
      required: true 
    },
    geopolitical_area: { 
      type: String, 
      required: true 
    },
    location: { 
      latitude: { type: Number, required: true }, 
      longitude: { type: Number, required: true } 
    },
    delivery_area: { 
      type: String, 
      required: true 
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true }
);

export const Location = mongoose.model<ILocation>('Location', LocationSchema);
