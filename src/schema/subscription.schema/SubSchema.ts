import mongoose, { Schema, Document, Model } from 'mongoose';


export interface ISubscription extends Document {
  user_id: mongoose.Types.ObjectId; 
  subscription_name: string; 
  description: string; 
  duration: number; 
  status: 'active' | 'expired' | 'inactive';
  created_at: Date; 
  updated_at: Date; 
}


export const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    subscription_name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    duration: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['active', 'expired', 'inactive'], 
    },
  },
  { timestamps: true } 
);



