import mongoose, { Schema, Document, Model } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';

export interface IReview extends Document,CommonDBInterface {
  user_id: mongoose.Types.ObjectId;        
  entity_id: mongoose.Types.ObjectId;       
  entity_type: 'Kitchen' | 'Item';          
  review_text: string;                       
  rating: number;                            
  status: boolean;                           
  review_reply?: string;                     
  is_verified: boolean;                      
                        
}
export const ReviewSchema: Schema<IReview> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entity_type'
    }, 
    entity_type: {
      type: String,
      enum: ['Kitchen', 'Item'],
      required: true
    },
    review_text: {
      type: String,
      required: true
    }, 
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }, 
    status: {
      type: Boolean,
      default: true
    }, 
    review_reply: {
      type: String,
      default: ''
    }, 
    is_verified: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true } 
);
 


const Review: Model<IReview> = mongoose.model<IReview>('Review',ReviewSchema);
export default Review;