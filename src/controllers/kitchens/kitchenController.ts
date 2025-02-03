import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import Kitchen from "../../models/kitchen/KitchenModel";
import mongoose from "mongoose";
import { CustomError } from "../../lib/errors/customError";
import { createAddressAndUpdateModel } from "../../lib/helpers/addressUpdater";
import PanCardDetails from "../../models/documentations/PanModel";
import GstCertificateDetails from "../../models/documentations/GstModel";
import FssaiCertificateDetails from "../../models/documentations/FfsaiModel";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";

export const handleCreateNewKitchens = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { basic_details, addresses, panDetails, gstDetails, fssaiDetails } =
      req.body;

    const requiredFields = [
      { field: "basic_details", message: "kitchen details are required." },
      { field: "addresses", message: "At least one address is required." },
      { field: "panDetails", message: "PAN card details are required." },
      { field: "gstDetails", message: "GST details are required." },
      { field: "fssaiDetails", message: "FSSAI details are required." },
    ];

    for (const { field, message } of requiredFields) {
      if (!req.body[field]) {
        throw new CustomError(
          message,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_TYPES.BAD_REQUEST_ERROR,
          false
        );
      }
    }

    const newKitchen = new Kitchen({ ...basic_details });
    const savedKitchen = await newKitchen.save();
    await createAddressAndUpdateModel(Kitchen, savedKitchen._id, addresses);
    await Kitchen.findById(savedKitchen._id).populate("address_id");

    const newPan = new PanCardDetails({
      prepared_by_id: savedKitchen._id as string,
      entity_type: "Kitchen",
      ...panDetails,
    });
    await newPan.save();

    const newGst = new GstCertificateDetails({
      prepared_by_id: savedKitchen._id as string,
      entity_type: "Kitchen",
      ...gstDetails,
    });
    await newGst.save();

    const newFssai = new FssaiCertificateDetails({
      kitchen_id: savedKitchen._id as string,
      ...fssaiDetails,
    });
    await newFssai.save();
    sendSuccessResponse(
      res,
      "Great! Your Kitchens successfullyy ceated",
      null,
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

export const handleGetKitchens = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Optional filters
    const matchQuery: any = { is_deleted: false };
    if (req.query.kitchen_status)
      matchQuery.kitchen_status = req.query.kitchen_status;
    if (req.query.kitchen_type)
      matchQuery.kitchen_type = req.query.kitchen_type;

    const kitchens = await Kitchen.aggregate([
      { $match: matchQuery },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          kitchen_name: 1,
          kitchen_owner_name: 1,
          kitchen_type: 1,
          kitchen_phone_number: 1,
          kitchen_image: 1,
        },
      },
    ]);
    const totalKitchens = await Kitchen.countDocuments(matchQuery);
    sendSuccessResponse(
      res,
      "Kitchens retrieved successfully!",
      {
        kitchens,
        totalPages: Math.ceil(totalKitchens / limit),
        currentPage: page,
        totalKitchens,
      },
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

export const handleGetKitchensById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { kitchenId } = req.params;
    validateMogooseObjectId(kitchenId);

    const kitchen = await Kitchen.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(kitchenId),
          is_deleted: false,
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "addresses",
        },
      },
      {
        $lookup: {
          from: "kitchenfssaicertificatedetails",
          localField: "_id",
          foreignField: "kitchen_id",
          as: "fssaiDetails",
        },
      },
      {
        $lookup: {
          from: "pancarddetails",
          let: { entityId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$prepared_by_id", "$$entityId"] },
                    { $eq: ["$entity_type", "Kitchen"] },
                  ],
                },
              },
            },
          ],
          as: "panDetails",
        },
      },
      {
        $lookup: {
          from: "gstcertificatedetails",
          let: { kitchenId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$prepared_by_id", "$$kitchenId"] },
                    { $eq: ["$entity_type", "Kitchen"] },
                  ],
                },
              },
            },
          ],
          as: "gstDetails",
        },
      },
      {
        $project: {
          _id: 1,
          kitchen_name: 1,
          kitchen_status: 1,
          kitchen_owner_name: 1,
          owner_email: 1,
          owner_phone_number: 1,
          restaurant_type: 1,
          kitchen_type: 1,
          kitchen_phone_number: 1,
          kitchen_document_verification: 1,
          kitchen_image: 1,
          working_days: 1,
          pre_ordering_options: 1,
          addresses: 1,
          panDetails: 1,
          gstDetails: 1,
          fssaiDetails: 1,
        },
      },
    ]);

    if (!kitchen || kitchen.length === 0) {
      throw new CustomError(
       "Kitchen not found",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    sendSuccessResponse(
      res,
      "Kitchen retrieved successfully!",
      kitchen[0],
      HTTP_STATUS_CODE.OK
    );
  } catch (error: any) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};

export const handleUpdateKitchensById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).json({ messgae: "update", id });
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};

export const handleDeleteKitchens = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { kitchenId } = req.params;
    validateMogooseObjectId(kitchenId);

    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!updatedKitchen) {
      throw new CustomError(
        "Kitchen not found",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }
    sendSuccessResponse(
      res,
      "Kitchen soft deleted successfully!",
      null,
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
