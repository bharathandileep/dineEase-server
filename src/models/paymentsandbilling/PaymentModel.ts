import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IPayment extends Document,CommonDBInterface {
  amount: number;
  payment_method: string;
  payment_date_time: Date;
  payment_status: 'pending' | 'completed' | 'failed';
  failure_reason?: string; 
  sent_by: string;
  received_by: string;
  order_id: mongoose.Types.ObjectId;

}


const PaymentSchema: Schema<IPayment> = new Schema<IPayment>(
  {
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    payment_date_time: { type: Date, required: true },
    payment_status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
    },
    failure_reason: {
      type: String,
      validate: {
        validator: function (this: IPayment, value: string) {
          return this.payment_status !== 'failed' || (value && value.trim().length > 0);
        },
        message: 'Failure reason is required when the payment status is failed.',
      },
    },
    sent_by: { type: String, required: true },
    received_by: { type: String, required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true } 
);


const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
