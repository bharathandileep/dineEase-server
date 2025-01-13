import mongoose, { Schema, Document, Model } from 'mongoose';
import { FeedbackSchema} from '../../schema/feedback/FeedbackSchema';


export interface IFeedback extends Document {
  entity_id: mongoose.Types.ObjectId; 
  entity_type: 'Kitchen' | 'Organization'; 
  feedback_text: string; 
  rating: number; 
  created_at: Date;
  updated_at: Date;
}


const Feedback: Model<IFeedback> = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
export default Feedback;
