import mongoose, { Document, Model } from 'mongoose';
import { ItemSchema } from '../../schema/item.table.schema/ItemTable.schema';

export interface IItem extends Document {
    item_name: string;          
    food_category: string;     
    category: string;          
    availability: boolean;     
    item_image: string;         
    item_description: string;   
    item_price: number;         
    created_at: Date;           
    updated_at: Date;          
    is_deleted: boolean;                 

  }
  const Item : Model<IItem> = mongoose.model<IItem>('Item',ItemSchema)
  export default Item;