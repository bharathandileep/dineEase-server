import { Request, Response } from "express";
import { sendErrorResponse } from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import Address from "../../models/address/AddressModel";
import Kitchen, { IKitchen } from "../../models/kitchen/KitchenModel";
import KitchenPanCardDetails from "../../models/documentations/PanModel";
import KitchenGstCertificateDetails from "../../models/documentations/GstModel";
import KitchenFssaiCertificateDetails from "../../models/documentations/FfsaiModel";

export const createAddressAndUpdateKitchen = async (
  kitchenId: string,
  addressDetails: any
) => {
  try {
    const newAddress = new Address(addressDetails);
    const savedAddress = await newAddress.save();

    // Update the kitchen with the new address ID
    await Kitchen.findByIdAndUpdate(kitchenId, {
      $push: { address_id: savedAddress._id },
    });
  } catch (error: any) {
    throw new Error(
      `Error creating address or updating kitchen: ${error.message}`
    );
  }
};

export const handleCreateNewKitchens = async (req: Request, res: Response) => {
  try {
    const { basic_details, addresses, panDetails, gstDetails, fssaiDetails } =
      req.body;

    if (!basic_details || !addresses) {
      return res
        .status(400)
        .json({ message: "Basic details and address are required." });
    }
    const newKitchen = new Kitchen({ ...basic_details });
    const savedKitchen = await newKitchen.save();
    await createAddressAndUpdateKitchen(savedKitchen._id as string, addresses);
    const updatedKitchen = await Kitchen.findById(savedKitchen._id).populate(
      "address_id"
    );
    if (panDetails) {
      const newPan = new KitchenPanCardDetails({
        kitchen_id: savedKitchen._id as string,
        ...panDetails,
      });
      await newPan.save();
    }

    if (gstDetails) {
      const newGst = new KitchenGstCertificateDetails({
        kitchen_id:savedKitchen._id as string,,
        ...gstDetails,
      });
      await newGst.save();
    }

    if (fssaiDetails) {
      const newFssai = new KitchenFssaiCertificateDetails({
        kitchen_id: savedKitchen._id as string,
        ...fssaiDetails,
      });
      await newFssai.save();
    }
    return res.status(201).json({
      message: "Kitchen created successfully!",
      kitchen: updatedKitchen,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};
