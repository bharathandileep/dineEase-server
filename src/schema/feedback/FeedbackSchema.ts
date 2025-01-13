import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Feedback document
export interface IFeedback extends Document {
  entity_id: mongoose.Types.ObjectId; // Reference to Kitchen or Organization
  entity_type: 'Kitchen' | 'Organization'; // Type of the entity
  feedback_text: string; // Feedback provided
  rating: number; // Rating (1-5, for example)
  created_at: Date;
  updated_at: Date;
}

// Define the Feedback schema
export const FeedbackSchema: Schema<IFeedback> = new Schema(
  {
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entity_type' // Dynamic reference to either Kitchen or Organization
    },
    entity_type: {
      type: String,
      enum: ['Kitchen', 'Organization'], // Restrict the values to 'Kitchen' or 'Organization'
      required: true
    },
    feedback_text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1 to 5)
  },
  { timestamps: true }
);

