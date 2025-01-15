import mongoose, { Document, Model } from 'mongoose';
import { FinancialReportSchema } from '../../schema/financialreport.schema/Financial.Reort.schema';

export interface IFinancialReport extends Document {
  prepared_by_id: mongoose.Types.ObjectId;   // Reference to Kitchen or Organization schema
  entity_type: string;                      // Indicates whether it's prepared by 'Kitchen' or 'Organization'
  cost_of_goods: number;                    // Total cost of goods
  total_returns: number;                    // Total returns
  total_profit: number;                     // Total profit
  gst_number: mongoose.Types.ObjectId;      // Reference to License and Certificates schema
  created_at: Date;                         // Timestamp when the report was created
  updated_at: Date;                         // Timestamp when the report was last updated
  is_deleted: boolean;                 

}
const FinancialReport : Model<IFinancialReport> = mongoose.model<IFinancialReport>('FinancialReport',FinancialReportSchema)
export default FinancialReport;