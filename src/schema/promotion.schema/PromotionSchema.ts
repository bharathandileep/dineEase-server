import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IPromotion extends Document {
  kitchen_id: mongoose.Types.ObjectId;
  name: string;
  banner:string;
  description: string;
  discount_percentage: number;
  discount_amount: number;
  start_date: Date;
  end_date: Date;
  status: boolean;
  is_deleted: boolean;                      

  created_at: Date;
  updated_at: Date;
}

export const PromotionSchema: Schema<IPromotion> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen', 
      required: true
    },
    name: { type: String, required: true },
    banner: { type: String, required: true },
    description: { type: String, required: true },
    discount_percentage: { type: Number, required: true },
    discount_amount: { type: Number, default: 0 },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: Boolean, default: true },
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true }
);

