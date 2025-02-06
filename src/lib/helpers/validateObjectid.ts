import mongoose from "mongoose";
import { CustomError } from "../errors/customError";
import { HTTP_STATUS_CODE } from "../constants/httpStatusCodes";
import { ERROR_TYPES } from "../constants/errorType";

export const validateMogooseObjectId = (id: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      "Invalid request ID format",
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE,
      false
    );
  }
};
