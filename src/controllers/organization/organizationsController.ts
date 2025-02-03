import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { CustomError } from "../../lib/errors/customError";
import { createAddressAndUpdateModel } from "../../lib/helpers/addressUpdater";
import Organization from "../../models/organisations/OrgModel";
import PanCardDetails from "../../models/documentations/PanModel";
import GstCertificateDetails from "../../models/documentations/GstModel";
import mongoose from "mongoose";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";

export const handleCreateNewOrganisation = async (
  req: Request,
  res: Response
) => {
  try {
    const { basic_details, addresses, panDetails, gstDetails } = req.body;
    const requiredFields = [
      { field: "basic_details", message: "Organisation details are required." },
      { field: "addresses", message: "At least one address is required." },
      { field: "panDetails", message: "PAN card details are required." },
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

    const newOrg = new Organization({ ...basic_details });
    const savedKitchen = await newOrg.save();
    await createAddressAndUpdateModel(
      Organization,
      savedKitchen._id,
      addresses
    );
    await Organization.findById(savedKitchen._id).populate("address_id");
    const newPan = new PanCardDetails({
      prepared_by_id: savedKitchen._id as string,
      entity_type: "Organization",
      ...panDetails,
    });
    await newPan.save();

    const newGst = new GstCertificateDetails({
      prepared_by_id: savedKitchen._id as string,
      entity_type: "Organization",
      ...gstDetails,
    });
    await newGst.save();

    return sendSuccessResponse(
      res,
      "Great! Your Orgaization successfully ceated",
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

export const handleGetOrganisations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const matchQuery: any = { is_deleted: false };
    if (req.query.kitchen_status)
      matchQuery.kitchen_status = req.query.kitchen_status;
    if (req.query.kitchen_type)
      matchQuery.kitchen_type = req.query.kitchen_type;

    const kitchens = await Organization.aggregate([
      { $match: matchQuery },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          organizationName: 1,
          managerName: 1,
          register_number: 1,
          contact_number: 1,
          email: 1,
          organizationLogo: 1,
        },
      },
    ]);

    const totalKitchens = await Organization.countDocuments(matchQuery);
    return sendSuccessResponse(
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
export const handleGetByIdOrganisations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { orgId } = req.params;
    validateMogooseObjectId(orgId);
    const organization = await Organization.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(orgId),
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
          from: "pancarddetails",
          let: { entityId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$prepared_by_id", "$$entityId"] },
                    { $eq: ["$entity_type", "Organization"] },
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
                    { $eq: ["$entity_type", "Organization"] },
                  ],
                },
              },
            },
          ],
          as: "gstDetails",
        },
      },
    ]);
    return sendSuccessResponse(
      res,
      "Kitchens retrieved successfully!",
      organization,
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

export const handleUpdateOrganisations = (req: Request, res: Response) => {
  try {
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};
export const handledDeleteOrganisations = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { kitchenId } = req.params;
    validateMogooseObjectId(kitchenId);

    const updatedKitchen = await Organization.findByIdAndUpdate(
      kitchenId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (!updatedKitchen) {
      return res.status(404).json({ message: "Kitchen not found" });
    }
    sendSuccessResponse(
      res,
      "Organization deleted successfully!",
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
