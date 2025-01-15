import mongoose, { Schema, Document, Model } from 'mongoose';
 

export interface IReview extends Document {
  user_id: mongoose.Types.ObjectId;         
  entity_id: mongoose.Types.ObjectId;       
  entity_type: 'Kitchen' | 'Item';           // Type of the entity being reviewed
  review_text: string;                       // Review content
  rating: number;                            // Rating for the entity (1-5)
  status: boolean;                           // Review visibility status (e.g., approved or hidden)
  review_reply?: string;                     // Optional reply from the entity owner (Kitchen or Item owner)
  is_verified: boolean;                      // Indicates if the review is verified (e.g., confirmed by admin or system)
  created_at: Date;                          // Timestamp when the review was created
  updated_at: Date;                          // Timestamp when the review was last updated
}
 
// Define the Review schema
export const ReviewSchema: Schema<IReview> = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, // Reference to the User schema
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entity_type'
    }, // Reference to either Kitchen or Item, dynamically referenced by entity_type
    entity_type: {
      type: String,
      enum: ['Kitchen', 'Item'],
      required: true
    }, // Specifies the entity type (either Kitchen or Item)
    review_text: {
      type: String,
      required: true
    }, // Text of the review
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }, // Rating given to the entity, between 1 and 5
    status: {
      type: Boolean,
      default: true
    }, // Whether the review is visible or hidden (approved or pending)
    review_reply: {
      type: String,
      default: ''
    }, // Optional reply from the entity owner (e.g., Kitchen owner or Item seller)
    is_verified: {
      type: Boolean,
      default: false
    }, // Whether the review has been verified (e.g., validated by admin)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
 
