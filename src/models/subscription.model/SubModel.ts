import mongoose, { Schema, Document, Model } from 'mongoose';
import { SubscriptionSchema } from '../../schema/subscription.schema/SubSchema';
 
 
export interface ISubscription extends Document {
  user_id: mongoose.Types.ObjectId;         
  subscription_name: string;                
  description: string;                       
  duration: number;                         
  status: 'active' | 'expired' | 'inactive'; 
  start_date: Date;                          
  end_date: Date;                            
  payment_status: 'paid' | 'pending' | 'failed';
  plan_type: 'premium' | 'basic' | 'other';  
  renewed: boolean;                          
  subscription_type: 'direct' | 'organization'; 
  subscription_plan_id: mongoose.Types.ObjectId; 
  plan_name: string;                       
  plan_description: string;                  
  created_at: Date;                       
  updated_at: Date;                     
}
 
const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;