import mongoose, { Schema, Document, Model } from 'mongoose';
import { ReviewSchema} from '../../schema/reviews/ReviewSchema';


export interface IReview extends Document {
  user_id: mongoose.Types.ObjectId; 
  entity_id: mongoose.Types.ObjectId; 
  entity_type: 'Kitchen' | 'Item'; 
  review_text: string; 
  rating: number; 
  status: boolean; 
  created_at: Date; 
  updated_at: Date; 
}



// Create and export the Review model
const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
