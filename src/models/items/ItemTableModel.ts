import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IItem extends Document,CommonDBInterface {
    item_name: string;          
    food_category: string;     
    category: string;          
    availability: boolean;     
    item_image: string;         
    item_description: string;   
    item_price: number;         
              

  }
  export const ItemSchema: Schema = new Schema<IItem>(
    {
      item_name: { type: String, required: true }, 
      food_category: { type: String, required: true }, 
      category: { type: String, required: true, enum: ['Veg', 'Non-Veg'] }, 
      availability: { type: Boolean, required: true, default: true }, 
      item_image: { type: String, default: null }, 
      item_description: { type: String, required: true }, 
      item_price: { type: Number, required: true }, 
      is_deleted: { 
        type: Boolean, 
        default: false 
      }, 
      
    },
    { timestamps: true } 
  );
  
  
  
  const Item : Model<IItem> = mongoose.model<IItem>('Item',ItemSchema)
  export default Item;