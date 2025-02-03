import mongoose, { Model } from "mongoose";
import Address from "../../models/address/AddressModel";
import { IOrganization } from "../../models/organisations/OrgModel";
import { IKitchen } from "../../models/kitchen/KitchenModel";

export const createAddressAndUpdateModel = async (
  model: Model<any>,
  modelId: any,
  addressDetails: any,
): Promise<void> => {
  try {
    const newAddress = new Address(addressDetails);
    const savedAddress = await newAddress.save();
    await model.findByIdAndUpdate(modelId, {
      $push: { address_id: savedAddress._id },
    });
  } catch (error: any) {
    throw new Error(
      `Error creating address or updating ${model.modelName}: ${error.message}`
    );
  }
};
