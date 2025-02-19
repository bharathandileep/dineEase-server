import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { CustomError } from "../../lib/errors/customError";
import {
  createAddressAndUpdateModel,
  updateAddress,
} from "../../lib/helpers/addressUpdater";
import Organization from "../../models/organisations/OrgModel";
import PanCardDetails from "../../models/documentations/PanModel";
import GstCertificateDetails from "../../models/documentations/GstModel";
import mongoose from "mongoose";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";
import { uploadFileToCloudinary } from "../../lib/utils/cloudFileManager";

export const handleCreateNewOrganisation = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      organizationName,
      managerName,
      registerNumber,
      contactNumber,
      email,
      numberOfEmployees,
      addressType,
      streetAddress,
      district,
      city,
      state,
      pincode,
      country,
      panNumber,
      panCardUserName,
      gstNumber,
      expiryDate,
      user_id,
    } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const kitchenImageUrl = await uploadFileToCloudinary(
      files.organizationLogo[0].buffer
    );

    const newOrg = await Organization.create({
      user_id: new mongoose.Types.ObjectId(user_id),
      organizationName,
      managerName,
      register_number: registerNumber,
      contact_number: contactNumber,
      email,
      no_of_employees: Number(numberOfEmployees),
      organizationLogo: kitchenImageUrl,
      is_deleted: false,
    });

    const newOrgId = newOrg._id;

    // Create an address for the organization
    await createAddressAndUpdateModel(Organization, newOrg._id, {
      street_address: streetAddress,
      city,
      state,
      district,
      pincode,
      country,
      address_type: addressType,
      prepared_by_id: newOrgId,
      entity_type: "Organization",
    });

    const gstImageUrl = await uploadFileToCloudinary(
      files.gstCertificateImage[0].buffer
    );
    const newGstCertificate = await GstCertificateDetails.create({
      prepared_by_id: newOrgId,
      entity_type: "Organization",
      gst_number: gstNumber,
      gst_certificate_image: gstImageUrl,
      expiry_date: expiryDate,
    });

    const panImageUrl = await uploadFileToCloudinary(
      files.panCardImage[0].buffer
    );
    const newPanCardDetails = await PanCardDetails.create({
      prepared_by_id: newOrgId,
      entity_type: "Organization",
      pan_card_number: panNumber,
      pan_card_user_name: panCardUserName,
      pan_card_image: panImageUrl,
    });

    return sendSuccessResponse(
      res,
      "Organization and associated details created successfully",
      null,
      HTTP_STATUS_CODE.OK
    );
  } catch (error) {
    return sendErrorResponse(
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
    if (req.query.organization_status)
      matchQuery.organization_status = req.query.organization_status;
   

    const orgnization = await Organization.aggregate([
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
          organizationName: 1,
          managerName: 1,
          register_number: 1,
          contact_number: 1,
          email: 1,
          organizationLogo: 1,
          addresses: 1,
          no_of_employees: 1,
        },
      },
    ]);

    const totalOrganization = await Organization.countDocuments(matchQuery);
    return sendSuccessResponse(
      res,
      "org retrieved successfully!",
      {
        orgnization,
        totalPages: Math.ceil(totalOrganization / limit),
        currentPage: page,
        totalOrganization,
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

export const handleUpdateOrganisations = async (
  req: Request,
  res: Response
) => {
  try {
    const organizationId = req.params.id;
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return sendErrorResponse(
        res,
        "Organization not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR
      );
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updateData = { ...req.body };

    if (files?.organizationLogo) {
      updateData.organizationLogo = await uploadFileToCloudinary(
        files.organizationLogo[0].buffer
      );
    }

    // Update basic organization details
    await Organization.findByIdAndUpdate(organizationId, {
      organizationName: updateData.organizationName,
      managerName: updateData.managerName,
      register_number: updateData.registerNumber,
      contact_number: updateData.contactNumber,
      email: updateData.email,
      no_of_employees: Number(updateData.numberOfEmployees),
      ...(updateData.organizationLogo && {
        organizationLogo: updateData.organizationLogo,
      }),
    });

    await updateAddress(Organization, organizationId, {
      street_address: updateData.streetAddress,
      city: updateData.city,
      state: updateData.state,
      district: updateData.district,
      pincode: updateData.pincode,
      country: updateData.country,
      address_type: updateData.addressType,
      prepared_by_id: organizationId,
      entity_type: "Organization",
    });

    const gstUpdateData: any = {
      gst_number: updateData.gstNumber,
      expiry_date: updateData.expiryDate,
    };

    if (files?.gstCertificateImage) {
      gstUpdateData.gst_certificate_image = await uploadFileToCloudinary(
        files.gstCertificateImage[0].buffer
      );
    }

    await GstCertificateDetails.findOneAndUpdate(
      { prepared_by_id: organizationId },
      gstUpdateData,
      { upsert: true }
    );

    const panUpdateData: any = {
      pan_card_number: updateData.panNumber,
      pan_card_user_name: updateData.panCardUserName,
    };

    if (files?.panCardImage) {
      panUpdateData.pan_card_image = await uploadFileToCloudinary(
        files.panCardImage[0].buffer
      );
    }

    await PanCardDetails.findOneAndUpdate(
      { prepared_by_id: organizationId },
      panUpdateData,
      { upsert: true }
    );

    return sendSuccessResponse(
      res,
      "Organization details updated successfully",
      null,
      HTTP_STATUS_CODE.OK
    );
  } catch (error) {
    return sendErrorResponse(
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
