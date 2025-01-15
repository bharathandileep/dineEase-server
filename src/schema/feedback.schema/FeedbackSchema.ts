import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IFeedback extends Document {
  entity_id: mongoose.Types.ObjectId;
  entity_type: 'Kitchen' | 'Organization'; 
  feedback_text: string; 
  rating: number; 
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;                 

}


export const FeedbackSchema: Schema<IFeedback> = new Schema(
  {
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entity_type' 
    },
    entity_type: {
      type: String,
      enum: ['Kitchen', 'Organization'], 
      required: true
    },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
    feedback_text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, 
  },
  { timestamps: true }
);

