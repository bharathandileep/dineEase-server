

// import mongoose, { Schema, Document, Model } from 'mongoose';


// export interface IOrder extends Document {
//   userId: mongoose.Types.ObjectId; 
//   itemId: mongoose.Types.ObjectId; 
//   addressId: mongoose.Types.ObjectId; 
//   kitchenId: mongoose.Types.ObjectId; 
//   deliveryDate: Date; 
//   is_deleted: boolean;                      

//   orderDate: Date; 
//   created_at: Date; 
//   updated_at: Date;
// }


// export const OrderSchema: Schema<IOrder> = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', 
//       required: true,
//     },
//     itemId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Item', 
//       required: true,
//     },
//     addressId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Address', 
//       required: true,
//     },
//     kitchenId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Kitchen', 
//       required: true,
//     },
//     is_deleted: { 
//       type: Boolean, 
//       default: false 
//     },
//     deliveryDate: { type: Date, required: true },
//     orderDate: { type: Date, default: Date.now, required: true },
//   },
//   { timestamps: true } 
// );

