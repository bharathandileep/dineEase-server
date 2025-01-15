import mongoose, { Schema, Document, Model } from 'mongoose';
 

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
 

export const SubscriptionSchema: Schema<ISubscription> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    subscription_name: { type: String, required: true },  
    description: { type: String, required: true },      
    duration: { type: Number, required: true },         
    status: {
      type: String,
      enum: ['active', 'expired', 'inactive'],
      default: 'inactive',
      required: true
    },
    start_date: { type: Date, required: true },          
    end_date: { type: Date, required: true },             
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
    renewed: { type: Boolean, default: false },        
    subscription_type: {
      type: String,
      enum: ['direct', 'organization'],
      required: true
    },
    subscription_plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true
    }, 
    plan_name: { type: String, required: true },      
    plan_description: { type: String, required: true },  
  },
  { timestamps: true } 
);
 

const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
export default Subscription;
 