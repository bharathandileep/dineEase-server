import { Request, Response } from "express";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { CustomError } from "../../lib/errors/customError";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import kitchenCategory from "../../models/kitchen/KitchenCategoryModel";
import mongoose from "mongoose";
import kitchenSubcategory from "../../models/kitchen/KitchenSubCategorymodel";

// Create a new category
export const kitchenCreateCategory = async (req: Request, res: Response) => {
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
    const existingCategory = await kitchenCategory.findOne({ category });
    if (existingCategory) {
      throw new CustomError(
        "Category already exists",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const newCategory = new kitchenCategory({
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



export const kitchenGetAllCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string)?.trim() || '';
    const status = req.query.status as string;
    const startIndex = (page - 1) * limit;

    // Build query object
    const query: any = {};
    if (search) {
      query.category = { $regex: search, $options: "i" }; // Case-insensitive search on category field
    }
    if (status && status !== "all") {
      query.status = status === "active" ? true : false; // Boolean status filter
    }



    const total = await kitchenCategory.countDocuments(query);
    const categories = await kitchenCategory.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    

    const pagination = {
      currentPage: page,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      itemsPerPage: limit,
    };

    sendSuccessResponse(
      res,
      "Categories retrieved successfully",
      { categories, pagination },
      HTTP_STATUS_CODE.OK
    );
  } catch (error) {
    console.error("Backend error:", error);
    sendErrorResponse(
      res,
      error,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.INTERNAL_SERVER_ERROR_TYPE
    );
  }
};

export const kitchenToggleCategoryStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const category = await kitchenCategory.findById(id);
    if (!category) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    const newStatus = !category.status;
    const session = await mongoose.startSession();
    let updatedCategory;

    await session.withTransaction(async () => {
      updatedCategory = await kitchenCategory.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true, session }
      );
      await kitchenSubcategory.updateMany(
        { category: id },
        { status: newStatus },
        { session }
      );
    });

    await session.endSession();
    const updatedSubcategoriesCount = await kitchenSubcategory.countDocuments({
      category: id,
    });

    sendSuccessResponse(
      res,
      `Category and ${updatedSubcategoriesCount} subcategories ${
        newStatus ? "activated" : "deactivated"
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

export const kitchenUpdateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const existingCategory = await kitchenCategory.findById(id);
    if (!existingCategory) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    if (category) {
      const duplicateCategory = await kitchenCategory.findOne({
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

    const updatedCategory = await kitchenCategory.findByIdAndUpdate(
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
export const kitchenDeleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await kitchenCategory.findById(id);
    if (!category) {
      throw new CustomError(
        "Category not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    await kitchenCategory.findByIdAndDelete(id);

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
