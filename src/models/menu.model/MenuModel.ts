import mongoose, { Schema, Document, Model } from 'mongoose';
import { MenuSchema} from '../../schema/menu.schema/MenuSchema';
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

const Menu: Model<IMenu> = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;

