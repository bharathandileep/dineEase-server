import mongoose, { Schema, Document, Model } from 'mongoose';


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
    review_text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);


