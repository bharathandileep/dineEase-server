import mongoose, { Document, Model } from 'mongoose';
import { ItemSchema } from '../../schema/item.table.schema/ItemTable.schema';

export interface IItem extends Document {
    item_name: string;          // Name of the item
    food_category: string;      // Category of food (e.g., 'Breakfast', 'Lunch', etc.)
    category: string;           // Type of food (e.g., 'Veg', 'Non-Veg')
    availability: boolean;      // Availability of the item (e.g., available or not)
    item_image: string;         // Image URL or file path of the item
    item_description: string;   // Description of the item
    item_price: number;         // Price of the item
    created_at: Date;           // Timestamp when the item was created
    updated_at: Date;           // Timestamp when the item was last updated
    is_deleted: boolean;                 

  }
  const Item : Model<IItem> = mongoose.model<IItem>('Item',ItemSchema)
  export default Item;