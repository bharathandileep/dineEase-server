import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Item document
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
}

// Define the Item schema
export const ItemSchema: Schema = new Schema<IItem>(
  {
    item_name: { type: String, required: true }, // Name of the item
    food_category: { type: String, required: true }, // Category of food (e.g., 'Breakfast', 'Lunch')
    category: { type: String, required: true, enum: ['Veg', 'Non-Veg'] }, // Food type (Veg or Non-Veg)
    availability: { type: Boolean, required: true, default: true }, // Availability status (true for available, false for unavailable)
    item_image: { type: String, default: null }, // URL or path to the item's image
    item_description: { type: String, required: true }, // Description of the item
    item_price: { type: Number, required: true }, // Price of the item
    created_at: { type: Date, default: Date.now }, // Timestamp when the item is created
    updated_at: { type: Date, default: Date.now }, // Timestamp when the item is last updated
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Item model
const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
