import mongoose, { Document, Model, Schema } from "mongoose";
import { CommonDBInterface } from "../../lib/interfaces/DBinterfaces";

export interface PanCardDetails extends Document, CommonDBInterface {
  prepared_by_id: mongoose.Types.ObjectId;
  pan_card_number: string;
  pan_card_user_name: string;
  pan_card_image: string;
  is_verified: boolean;
  entity_type: string;
}

export const PanCardDetailsSchema: Schema =
  new Schema<PanCardDetails>(
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
      pan_card_number: {
        type: String,
        required: true,
      },
      pan_card_user_name: {
        type: String,
        required: true,
      },
      pan_card_image: {
        type: String,
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

const PanCardDetails: Model<PanCardDetails> =
  mongoose.model<PanCardDetails>(
    "PanCardDetails",
    PanCardDetailsSchema
  );

export default PanCardDetails;
