import { Request, Response } from "express";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { CustomError } from "../../lib/errors/customError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import MenuCategory from "../../models/items/MenuCategory";

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    if (!category) {
      throw new CustomError(
        "Category name is required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }
    const existingCategory = await MenuCategory.findOne({ category });
    if (existingCategory) {
      throw new CustomError(
        "Category already exists",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const newCategory = new MenuCategory({
      category,
      status: true,
    });

    await newCategory.save();

    sendSuccessResponse(
      res,
      "Category created successfully",
      newCategory,
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

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await MenuCategory.find();
    sendSuccessResponse(
      res,
      "Categories retrieved successfully",
      categories,
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

export const toggleCategoryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await MenuCategory.findById(id);
    if (!category) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    const updatedCategory = await MenuCategory.findByIdAndUpdate(
      id,
      { status: !category.status },
      { new: true }
    );

    sendSuccessResponse(
      res,
      `Category status ${
        updatedCategory?.status ? "activated" : "deactivated"
      } successfully`,
      updatedCategory,
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const existingCategory = await MenuCategory.findById(id);
    if (!existingCategory) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    if (category) {
      const duplicateCategory = await MenuCategory.findOne({
        category,
        _id: { $ne: id },
      });

      if (duplicateCategory) {
        throw new CustomError(
          "Category name already exists",
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_TYPES.BAD_GATEWAY_ERROR,
          false
        );
      }
    }

    const updatedCategory = await MenuCategory.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );

    sendSuccessResponse(
      res,
      "Category updated successfully",
      updatedCategory,
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

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await MenuCategory.findById(id);
    if (!category) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    await MenuCategory.findByIdAndDelete(id);

    sendSuccessResponse(
      res,
      "Category deleted successfully",
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
