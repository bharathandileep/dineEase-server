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
import { createAddressAndUpdateModel, updateAddress } from "../../lib/helpers/addressUpdater";
import PanCardDetails from "../../models/documentations/PanModel";
import GstCertificateDetails from "../../models/documentations/GstModel";
import FssaiCertificateDetails from "../../models/documentations/FfsaiModel";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";
import { uploadFileToCloudinary } from "../../lib/utils/cloudFileManager";

export const handleCreateNewKitchens = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      kitchen_name,
      user_id,
      kitchen_status,
      kitchen_owner_name,
      owner_email,
      owner_phone_number,
      restaurant_type,
      kitchen_type,
      kitchen_phone_number,
      address_type,
      street_address,
      district,
      city,
      state,
      pincode,
      country,
      pan_card_number,
      pan_card_user_name,
      gst_number,
      gst_expiry_date,
      ffsai_certificate_number,
      ffsai_card_owner_name,
      ffsai_expiry_date,
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const kitchenImageUrl = await uploadFileToCloudinary(
      files.kitchen_image[0].buffer
    );
    const newKitchen = await Kitchen.create({
      kitchen_name,
      user_id: new mongoose.Types.ObjectId(user_id),
      kitchen_status,
      kitchen_owner_name,
      owner_email,
      owner_phone_number,
      restaurant_type,
      kitchen_type,
      kitchen_phone_number,
      kitchen_image: kitchenImageUrl,
      working_days: [],
      pre_ordering_options: [],
    });

    const kitchenId = newKitchen._id;

    await createAddressAndUpdateModel(Kitchen, newKitchen._id, {
      street_address,
      city,
      state,
      district,
      pincode,
      country,
      address_type,
      prepared_by_id: kitchenId,
      entity_type: "Kitchen",
    });
    const FsssaiImageUrl = await uploadFileToCloudinary(
      files.ffsai_certificate_image[0].buffer
    );
    await FssaiCertificateDetails.create({
      kitchen_id: kitchenId,
      ffsai_certificate_number,
      ffsai_card_owner_name,
      ffsai_certificate_image: FsssaiImageUrl,
      expiry_date: ffsai_expiry_date,
    });
    const gstImageUrl = await uploadFileToCloudinary(
      files.gst_certificate_image[0].buffer
    );
    const newGstCertificate = await GstCertificateDetails.create({
      prepared_by_id: kitchenId,
      entity_type: "Kitchen",
      gst_number,
      gst_certificate_image: gstImageUrl,
      expiry_date: gst_expiry_date,
    });

    const panImageUrl = await uploadFileToCloudinary(
      files.pan_card_image[0].buffer
    );
    const newPanCardDetails = await PanCardDetails.create({
      prepared_by_id: kitchenId,
      entity_type: "Kitchen",
      pan_card_number,
      pan_card_user_name,
      pan_card_image: panImageUrl,
    });
    return sendSuccessResponse(
      res,
      "Kitchen and associated details created successfully",
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
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "addresses",
        },
      },
      {
        $project: {
          _id: 1,
          kitchen_name: 1,
          kitchen_owner_name: 1,
          kitchen_type: 1,
          kitchen_phone_number: 1,
          kitchen_image: 1,
          addresses: 1,
          owner_email: 1,
          kitchen_status: 1,
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

export const handleUpdateKitchensById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const  kitchenId = req.params.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const {
      kitchen_name,
      kitchen_status,
      kitchen_owner_name,
      owner_email,
      owner_phone_number,
      restaurant_type,
      kitchen_type,
      kitchen_phone_number,
      address_type,
      street_address,
      district,
      city,
      state,
      pincode,
      country,
      pan_card_number,
      pan_card_user_name,
      gst_number,
      gst_expiry_date,
      ffsai_certificate_number,
      ffsai_card_owner_name,
      ffsai_expiry_date,
    } = req.body;

    
    validateMogooseObjectId(kitchenId);

    const existingKitchen = await Kitchen.findOne({
      _id: kitchenId,
      is_deleted: false,
    });

    if (!existingKitchen) {
      throw new CustomError(
        "Kitchen not found",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    const kitchen_image = files.kitchen_image
      ? await uploadFileToCloudinary(files.kitchen_image[0].buffer)
      : existingKitchen.kitchen_image;
    const pan_image = files.pan_card_image
      ? await uploadFileToCloudinary(files.pan_card_image[0].buffer)
      : null;
    const gst_image = files.gst_certificate_image
      ? await uploadFileToCloudinary(files.gst_certificate_image[0].buffer)
      : null;
    const fssai_image = files.ffsai_certificate_image
      ? await uploadFileToCloudinary(files.ffsai_certificate_image[0].buffer)
      : null;

    // Update kitchen basic details
    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenId,
      {
        $set: {
          kitchen_name,
          kitchen_status,
          kitchen_owner_name,
          owner_email,
          owner_phone_number,
          restaurant_type,
          kitchen_type,
          kitchen_phone_number,
          kitchen_image,
        },
      },
      { new: true }
    );

    // Update or create address
    const addressData = {
      street_address,
      district,
      city,
      state,
      pincode,
      country,
      address_type,
      kitchen_id: kitchenId,
    };

    await updateAddress(Kitchen, kitchenId, {
      street_address: street_address,
      city,
      state,
      district,
      pincode,
      country,
      address_type,
      prepared_by_id: kitchenId,
      entity_type: "Kitchen",
    });

    // Update or create PAN details
    if (pan_card_number) {
      const panData = {
        pan_card_number,
        pan_card_user_name,
        pan_card_image: pan_image,
        prepared_by_id: kitchenId,
        entity_type: "Kitchen",
      };

      await PanCardDetails.findOneAndUpdate(
        {
          prepared_by_id: kitchenId,
          entity_type: "Kitchen",
        },
        panData,
        { upsert: true, new: true }
      );
    }

    // Update or create GST details
    if (gst_number) {
      const gstData = {
        gst_number,
        gst_certificate_image: gst_image,
        expiry_date: gst_expiry_date,
        prepared_by_id: kitchenId,
        entity_type: "Kitchen",
      };

      await GstCertificateDetails.findOneAndUpdate(
        {
          prepared_by_id: kitchenId,
          entity_type: "Kitchen",
        },
        gstData,
        { upsert: true, new: true }
      );
    }

    // Update or create FSSAI details
    if (ffsai_certificate_number) {
      const fssaiData = {
        ffsai_certificate_number,
        ffsai_card_owner_name,
        ffsai_certificate_image: fssai_image,
        expiry_date: ffsai_expiry_date,
        kitchen_id: kitchenId,
      };

      await FssaiCertificateDetails.findOneAndUpdate(
        { kitchen_id: kitchenId },
        fssaiData,
        { upsert: true, new: true }
      );
    }

    sendSuccessResponse(
      res,
      "Kitchen updated successfully!",
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
