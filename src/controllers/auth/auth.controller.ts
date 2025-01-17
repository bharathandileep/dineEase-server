import { Request, Response } from "express";
import { CustomError } from "../../lib/errors/customError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import User from "../../models/UserModel";

export const handleGoogleAuth = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, name, picture } = req.body.user;
    let user = await User.findOne({ email });
    if (user) {
      user.profile_photo = picture;
      await user.save();
      return sendSuccessResponse(
        res,
        "User logged in successfully.",
        user,
        HTTP_STATUS_CODE.OK
      );
    }
    user = new User({
      fullName: name,
      email,
      profile_photo: picture,
    });
    await user.save();
    return sendSuccessResponse(
      res,
      "User registered successfully.",
      user,
      HTTP_STATUS_CODE.OK
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};
