import mongoose, { Schema, Document, Model } from 'mongoose';
import { ReviewSchema} from '../../schema/reviews.schema/ReviewSchema';


export interface IReview extends Document {
  user_id: mongoose.Types.ObjectId; 
  entity_id: mongoose.Types.ObjectId; 
  entity_type: 'Kitchen' | 'Item'; 
  review_text: string; 
  rating: number; 
  status: boolean; 
  is_deleted: boolean;

  created_at: Date; 
  updated_at: Date; 
}





const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);


export default Review;
