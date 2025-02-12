import { Request, Response } from "express";
import { CustomError } from "../../lib/errors/customError";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";
import EmployeeManagement from "../../models/empmanagment/EmployeeManagementModel";
import Designation from "../../models/designation/designationModel";
import Address from "../../models/address/AddressModel";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeManagement.find({ is_deleted: false })
      .populate("designation", "designation_name")
      .populate("address", "street city state country");

    sendSuccessResponse(
      res,
      "Employees retrieved successfully",
      employees,
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

// Create new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      entity_id,
      entity_type,
      designation,
      username,
      email,
      phone_number,
      address,
      role,
      employee_status,
      aadhar_number,
      pan_number,
      profile_picture,
    } = req.body;

    if (
      !entity_id ||
      !entity_type ||
      !designation ||
      !username ||
      !email ||
      !phone_number ||
      !address ||
      !employee_status ||
      !aadhar_number ||
      !pan_number
    ) {
      throw new CustomError(
        "All required fields must be provided",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR,
        false
      );
    }

    validateMogooseObjectId(entity_id);
    validateMogooseObjectId(designation);
    validateMogooseObjectId(address);

    const existingDesignation = await Designation.findById(designation);
    if (!existingDesignation) {
      throw new CustomError(
        "Designation not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    const existingAddress = await Address.findById(address);
    if (!existingAddress) {
      throw new CustomError(
        "Address not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    const existingEmployee = await EmployeeManagement.findOne({ email });
    if (existingEmployee) {
      throw new CustomError(
        "Employee with this email already exists",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR,
        false
      );
    }

    const newEmployee = new EmployeeManagement({
      entity_id,
      entity_type,
      designation,
      username,
      email,
      phone_number,
      address,
      role,
      employee_status,
      aadhar_number,
      pan_number,
      profile_picture,
    });

    await newEmployee.save();

    sendSuccessResponse(
      res,
      "Employee created successfully",
      newEmployee,
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

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    validateMogooseObjectId(id);

    const employee = await EmployeeManagement.findById(id)
      .populate("designation", "designation_name")
      .populate("address", "street city state country");

    if (!employee || employee.is_deleted) {
      throw new CustomError(
        "Employee not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    sendSuccessResponse(
      res,
      "Employee retrieved successfully",
      employee,
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

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    validateMogooseObjectId(id);

    if (updateData.designation) {
      validateMogooseObjectId(updateData.designation);
      const designationExists = await Designation.findById(updateData.designation);
      if (!designationExists) {
        throw new CustomError(
          "Designation not found",
          HTTP_STATUS_CODE.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR,
          false
        );
      }
    }

    if (updateData.address) {
      validateMogooseObjectId(updateData.address);
      const addressExists = await Address.findById(updateData.address);
      if (!addressExists) {
        throw new CustomError(
          "Address not found",
          HTTP_STATUS_CODE.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR,
          false
        );
      }
    }

    const updatedEmployee = await EmployeeManagement.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("designation", "designation_name")
      .populate("address", "street city state country");

    if (!updatedEmployee) {
      throw new CustomError(
        "Employee not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    sendSuccessResponse(
      res,
      "Employee updated successfully",
      updatedEmployee,
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

// Toggle employee status
export const toggleEmployeeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    validateMogooseObjectId(id);

    const employee = await EmployeeManagement.findById(id);
    if (!employee) {
      throw new CustomError(
        "Employee not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    employee.employee_status = employee.employee_status === "Active" ? "Inactive" : "Active";
    await employee.save();

    sendSuccessResponse(
      res,
      `Employee status changed to ${employee.employee_status}`,
      employee,
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

// Soft delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    validateMogooseObjectId(id);

    const employee = await EmployeeManagement.findById(id);
    if (!employee) {
      throw new CustomError(
        "Employee not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    employee.is_deleted = true;
    await employee.save();

    sendSuccessResponse(
      res,
      "Employee deleted successfully",
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
