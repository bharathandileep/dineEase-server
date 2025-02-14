import { Request, Response } from "express";
import mongoose from "mongoose";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { CustomError } from "../../lib/errors/customError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import Designation from "../../models/designation/designationModel";
import Role from "../../models/users/RolesModels";


export const createDesignation = async (req: Request, res: Response) => {
  try {
    const { designation, created_by = "67a1083b3c9f01a384e9683c" } = req.body;

    if (!designation) {
      throw new CustomError(
        "Designation name is required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    let existingRole = await Role.findOne({ role_name: designation });

    if (!existingRole) {
      const lastRole = await Role.findOne().sort({ role_id: -1 });
      const newRoleId = lastRole ? lastRole.role_id + 1 : 6;
      existingRole = new Role({
        role_id: newRoleId,
        role_name: designation,
        created_by,
        permission: 1,
      });

      await existingRole.save();
    }

    const existingDesignation = await Designation.findOne({
      designation_name: designation,
    });
    if (existingDesignation) {
      throw new CustomError(
        "Designation already exists",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    const newDesignation = new Designation({
      designation_name: designation,
      role_id: existingRole.role_id,
      role_name: existingRole.role_name,
      created_by,
      status: true,
    });

    await newDesignation.save();

    sendSuccessResponse(
      res,
      "Designation created successfully",
      newDesignation,
      HTTP_STATUS_CODE.CREATED
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

export const getAllDesignations = async (req: Request, res: Response) => {
  try {
    const designations = await Designation.find();
    sendSuccessResponse(
      res,
      "Designations retrieved successfully",
      designations,
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
export const getDesignationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(
        "Invalid Designation ID",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    const designation = await Designation.findById(id);

    if (!designation) {
      throw new CustomError(
        "Designation not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    sendSuccessResponse(
      res,
      "Designation retrieved successfully",
      designation,
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
export const toggleDesignationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findById(id);

    if (!designation) {
      throw new CustomError(
        "Designation not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    const newStatus = !designation.status;
    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    sendSuccessResponse(
      res,
      `Designation ${newStatus ? "activated" : "deactivated"} successfully`,
      updatedDesignation,
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
export const updateDesignation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { designation, created_by, updated_by } = req.body;

    // Check if the designation exists
    const existingDesignation = await Designation.findById(id);
    if (!existingDesignation) {
      throw new CustomError(
        "Designation not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    // Check for duplicate designation name (excluding the current one)
    if (designation) {
      const duplicateDesignation = await Designation.findOne({
        designation,
        _id: { $ne: id },
      });

      if (duplicateDesignation) {
        throw new CustomError(
          "Designation name already exists",
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_TYPES.BAD_REQUEST_ERROR,
          false
        );
      }
    }

    // Update designation with new values
    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      { designation_name: designation, created_by, updated_by },
      { new: true } // Ensures the updated document is returned
    );

    // Send success response
    sendSuccessResponse(
      res,
      "Designation updated successfully",
      updatedDesignation,
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
export const deleteDesignation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const designation = await Designation.findById(id);
    if (!designation) {
      throw new CustomError(
        "Designation not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    await Designation.findByIdAndDelete(id);

    sendSuccessResponse(
      res,
      "Designation deleted successfully",
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
