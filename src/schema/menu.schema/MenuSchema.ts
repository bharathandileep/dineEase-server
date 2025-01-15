
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMenu extends Document {
  kitchen_id: mongoose.Types.ObjectId;       
  items_id: mongoose.Types.ObjectId[];       
  menu_image: string;                        
  item_type: string;                         
  delivery_time: number;                   
  reviews_id: mongoose.Types.ObjectId[];     
  is_deleted: boolean;                       
  created_at: Date;                          
  updated_at: Date;                         
}

export const MenuSchema: Schema<IMenu> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen',
      required: true,
    }, 
    items_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
    ], 
    menu_image: {
      type: String,
      required: true,
    }, 
    item_type: {
      type: String,
      required: true,
      enum: ['vegetarian', 'non-vegetarian', 'vegan', 'mixed'], 
    }, 
    delivery_time: {
      type: Number,
      required: true,
    },
    reviews_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ], 
    is_deleted: {
      type: Boolean,
      default: false,
    }, 
  },
  { timestamps: true } 
);



