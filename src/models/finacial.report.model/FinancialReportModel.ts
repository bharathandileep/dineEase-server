import mongoose, { Document, Model } from 'mongoose';
import { FinancialReportSchema } from '../../schema/financialreport.schema/Financial.Reort.schema';

export interface IFinancialReport extends Document {
  prepared_by_id: mongoose.Types.ObjectId;   
  entity_type: string;                     
  cost_of_goods: number;                    
  total_returns: number;                    
  total_profit: number;                     
  gst_number: mongoose.Types.ObjectId;     
  created_at: Date;                         
  updated_at: Date;                         
  is_deleted: boolean;                 

}
const FinancialReport : Model<IFinancialReport> = mongoose.model<IFinancialReport>('FinancialReport',FinancialReportSchema)
export default FinancialReport;