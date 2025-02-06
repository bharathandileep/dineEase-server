import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface GstCertificateDetails
  extends Document,
    CommonDBInterface {
  prepared_by_id: mongoose.Types.ObjectId;
  gst_number: string;
  gst_certificate_image: string;
  expiry_date: Date;
  is_verified: boolean;
  entity_type: string;
}
export const GstCertificateDetailsSchema: Schema =
  new Schema<GstCertificateDetails>(
    {
      prepared_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "entity_type",
      },
      entity_type: {
        type: String,
        required: true,
        enum: ["Kitchen", "Organization"],
      },
      gst_number: {
        type: String,
        required: true,
      },
      gst_certificate_image: {
        type: String,
        required: true,
      },
      expiry_date: {
        type: Date,
        required: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

const GstCertificateDetails: Model<GstCertificateDetails> =
  mongoose.model<GstCertificateDetails>(
    "GstCertificateDetails",
    GstCertificateDetailsSchema
  );
export default GstCertificateDetails;
