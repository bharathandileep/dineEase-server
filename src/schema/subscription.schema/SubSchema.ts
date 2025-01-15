import mongoose, { Schema, Document, Model } from 'mongoose';
 
// Define the interface for the Subscription document
export interface ISubscription extends Document {
  user_id: mongoose.Types.ObjectId;         // Reference to the User schema
  subscription_name: string;                 // Name of the subscription
  description: string;                       // Description of the subscription
  duration: number;                          // Duration of the subscription (in days, months, etc.)
  status: 'active' | 'expired' | 'inactive'; // Current status of the subscription
  start_date: Date;                          // Start date of the subscription
  end_date: Date;                            // End date of the subscription
  payment_status: 'paid' | 'pending' | 'failed'; // Status of the payment
  plan_type: 'premium' | 'basic' | 'other';  // Type of the plan (e.g., 'premium', 'basic')
  renewed: boolean;                          // Whether the subscription has been renewed
  subscription_type: 'direct' | 'organization'; // Subscription type (direct or through organization)
  subscription_plan_id: mongoose.Types.ObjectId; // ID for the subscription plan
  plan_name: string;                         // Name of the subscription plan
  plan_description: string;                  // Description of the subscription plan
  created_at: Date;                          // Timestamp when the subscription was created
  updated_at: Date;                          // Timestamp when the subscription was last updated
}
 
// Define the Subscription schema
export const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    subscription_name: { type: String, required: true },  // Name of the subscription
    description: { type: String, required: true },        // Description of the subscription
    duration: { type: Number, required: true },           // Duration of the subscription
    status: {
      type: String,
      enum: ['active', 'expired', 'inactive'],
      default: 'inactive',
      required: true
    },
    start_date: { type: Date, required: true },           // Subscription start date
    end_date: { type: Date, required: true },             // Subscription end date
    payment_status: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'pending',
      required: true
    },
    plan_type: {
      type: String,
      enum: ['premium', 'basic', 'other'],
      default: 'basic',
      required: true
    },
    renewed: { type: Boolean, default: false },          // Subscription renewal status
    subscription_type: {
      type: String,
      enum: ['direct', 'organization'],
      required: true
    },
    subscription_plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true
    }, // Reference to a Subscription Plan model
    plan_name: { type: String, required: true },         // Name of the subscription plan
    plan_description: { type: String, required: true },  // Description of the subscription plan
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
// Create and export the Subscription model
const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;
 