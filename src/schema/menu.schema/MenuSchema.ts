import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IMenu extends Document {
  kitchen_id: mongoose.Types.ObjectId; 
  items_id: mongoose.Types.ObjectId[]; 
  menu_image: string; 
  created_at: Date;
  updated_at: Date;
}


export const MenuSchema: Schema<IMenu> = new Schema(
  {
    kitchen_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kitchen', 
      required: true
    },
    items_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', 
        required: true
      }
    ],
    menu_image: { type: String, required: true },
  },
  { timestamps: true }
);

