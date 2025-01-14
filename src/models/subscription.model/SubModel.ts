import mongoose, { Schema, Document, Model } from 'mongoose';
import { SubscriptionSchema} from '../../schema/subscription.schema/SubSchema';

export interface ISubscription extends Document {
  user_id: mongoose.Types.ObjectId; 
  subscription_name: string; 
  description: string; 
  duration: number; 
  status: 'active' | 'expired' | 'inactive'; 
  created_at: Date;
  updated_at: Date;
}


const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;
