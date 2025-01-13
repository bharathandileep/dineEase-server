import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Financial Report document
export interface IFinancialReport extends Document {
  prepared_by_id: mongoose.Types.ObjectId;   // Reference to Kitchen or Organization schema
  entity_type: string;                      // Indicates whether it's prepared by 'Kitchen' or 'Organization'
  cost_of_goods: number;                    // Total cost of goods
  total_returns: number;                    // Total returns
  total_profit: number;                     // Total profit
  gst_number: mongoose.Types.ObjectId;      // Reference to License and Certificates schema
  created_at: Date;                         // Timestamp when the report was created
  updated_at: Date;                         // Timestamp when the report was last updated
}

// Define the Financial Report schema
export const FinancialReportSchema: Schema = new Schema<IFinancialReport>(
  {
    prepared_by_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      refPath: 'entity_type', 
      required: true 
    }, // Reference to either Kitchen or Organization schema
    entity_type: { 
      type: String, 
      required: true, 
      enum: ['Kitchen', 'Organization'] 
    }, // Specifies whether the report is for a Kitchen or Organization
    cost_of_goods: { type: Number, required: true }, // Total cost of goods
    total_returns: { type: Number, required: true }, // Total returns
    total_profit: { type: Number, required: true }, // Total profit
    gst_number: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'LicenseAndCertificates', 
      required: true 
    }, // Reference to License and Certificates schema
    created_at: { type: Date, default: Date.now }, // Timestamp when the report is created
    updated_at: { type: Date, default: Date.now }, // Timestamp when the report is last updated
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Financial Report model
const FinancialReport = mongoose.model<IFinancialReport>('FinancialReport', FinancialReportSchema);
export default FinancialReport;
