import mongoose, { Schema, Document, Model } from 'mongoose';
import { MenuSchema} from '../../schema/menu.schema/MenuSchema';
export interface IMenu extends Document {
  kitchen_id: mongoose.Types.ObjectId;       // Reference to the Kitchen schema
  items_id: mongoose.Types.ObjectId[];       // Reference to the Item schema
  menu_image: string;                        // Image of the menu
  item_type: string;                         // Type of items in the menu (e.g., vegetarian, non-vegetarian)
  delivery_time: number;                     // Delivery time in minutes
  reviews_id: mongoose.Types.ObjectId[];     // Reference to the Reviews schema
  is_deleted: boolean;                       // Soft delete flag
  created_at: Date;                          // Timestamp when the menu was created
  updated_at: Date;                          // Timestamp when the menu was last updated
}

const Menu: Model<IMenu> = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;

