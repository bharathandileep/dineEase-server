import mongoose, { Document, Model, Schema } from 'mongoose';
import { CommonDBInterface } from '../../lib/interfaces/DBinterfaces';


export interface IFinancialReport extends Document,CommonDBInterface {
  prepared_by_id: mongoose.Types.ObjectId;   
  entity_type: string;                     
  cost_of_goods: number;                    
  total_returns: number;                    
  total_profit: number;                     
  gst_number: mongoose.Types.ObjectId;     
             

}

export const FinancialReportSchema: Schema = new Schema<IFinancialReport>(
  {
    prepared_by_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      refPath: 'entity_type', 
      required: true 
    }, 
    entity_type: { 
      type: String, 
      required: true, 
      enum: ['Kitchen', 'Organization'] 
    }, 
    cost_of_goods: { type: Number, required: true }, 
    total_returns: { type: Number, required: true }, 
    total_profit: { type: Number, required: true }, 
    gst_number: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'LicenseAndCertificates', 
      required: true 
    }, 
    is_deleted: { 
      type: Boolean, 
      default: false 
    }, 
  },
  { timestamps: true } 
);



const FinancialReport : Model<IFinancialReport> = mongoose.model<IFinancialReport>('FinancialReport',FinancialReportSchema)
export default FinancialReport;