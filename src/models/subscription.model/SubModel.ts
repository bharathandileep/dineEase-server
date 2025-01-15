import mongoose, { Schema, Document, Model } from 'mongoose';
import { SubscriptionSchema } from '../../schema/subscription.schema/SubSchema';
 
 
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
 
const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;