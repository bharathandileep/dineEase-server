import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IBilling extends Document,CommonDBInterface {
  order_id: mongoose.Types.ObjectId;   
  billing_date: Date;  
                   
}
export const BillingSchema: Schema = new Schema<IBilling>(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, 
    billing_date: { type: Date, default: Date.now, required: true }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);

 const Billing : Model<IBilling> = mongoose.model<IBilling>('Billing',BillingSchema)
 export default Billing;