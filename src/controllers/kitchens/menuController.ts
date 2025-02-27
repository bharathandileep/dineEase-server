import { Request, Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "../../lib/errors/customError";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import Kitchen from "../../models/kitchen/KitchenModel";
import Item from "../../models/items/ItemTableModel";
import Menu from "../../models/items/MenuModel";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";

// Define interfaces
interface IMenuItem {
  item_id: mongoose.Types.ObjectId;
  item_price: string;
  custom_image?: string;
  isAvailable: boolean;
  reviews_id: mongoose.Types.ObjectId[];
}

export const addMenuItems = async (req: Request, res: Response) => {
  try {
    const kitchen_id = req.params.id;
    const items = req.body;

    if (!kitchen_id || !Array.isArray(items) || items.length === 0) {
      throw new CustomError(
        "Kitchen ID and at least one item are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_GATEWAY_ERROR,
        false
      );
    }

    const existingKitchen = await Kitchen.findById(kitchen_id);
    if (!existingKitchen) {
      throw new CustomError(
        "Kitchen not found",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    let existingMenu = await Menu.findOne({ kitchen_id, is_deleted: false });

    if (!existingMenu) {
      existingMenu = new Menu({
        kitchen_id,
        items_id: [],
        is_deleted: false,
      });
    }
    for (const item of items) {
      const { itemId, image } = item;

      if (!itemId) {
        throw new CustomError(
          "Each item must have an itemId",
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_TYPES.BAD_GATEWAY_ERROR,
          false
        );
      }

      const existingItem = await Item.findById(itemId);
      if (!existingItem) {
        throw new CustomError(
          `Item not found: ${itemId}`,
          HTTP_STATUS_CODE.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR,
          false
        );
      }

      // Check if item already exists in the menu
      const itemExists = existingMenu.items_id.some(
        (menuItem) => menuItem.item_id.toString() === itemId
      );

      if (!itemExists) {
        existingMenu.items_id.push({
          item_id: new mongoose.Types.ObjectId(itemId),
          custom_image: image,
          isAvailable: true,
          reviews_id: [],
        });
      }
    }
    await existingMenu.save();

    return sendSuccessResponse(
      res,
      "Items added to menu successfully",
      existingMenu,
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

export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const { kitchenId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(kitchenId)) {
      return sendErrorResponse(
        res,
        new Error("Invalid kitchen ID format"),
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR
      );
    }

    const menus = await Menu.find({
      kitchen_id: kitchenId,
      is_deleted: false,
    })
      .populate({
        path: "kitchen_id",
        select: "_id name location contact_details",
      })
      .populate({
        path: "items_id.item_id",
        select:
          "item_name item_description category subcategory status item_image",
        populate: [
          {
            path: "category",
            select: "category",
            model: "MenuCategory",
          },
          {
            path: "subcategory",
            select: "subcategory",
            model: "MenuSubcategory",
          },
        ],
      });

    if (!menus || menus.length === 0) {
      sendSuccessResponse(
        res,
        "No menus found for this kitchen",
        [],
        HTTP_STATUS_CODE.OK
      );
    }

    const timestamp = new Date().toISOString();

    res.status(HTTP_STATUS_CODE.OK).json({
      status: true,
      message: "Menus retrieved successfully",
      data: menus,
      statusCode: HTTP_STATUS_CODE.OK,
      timestamp,
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

export const 
removeMenuItem = async (req: Request, res: Response) => {
  try {
    const { kitchen_id, item_id } = req.params;

    if (!kitchen_id || !item_id) {
      throw new CustomError(
        "Kitchen ID and Item ID are required",
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_TYPES.BAD_REQUEST_ERROR,
        false
      );
    }

    // Find the menu for the given kitchen
    const existingMenu = await Menu.findOne({ kitchen_id, is_deleted: false });

    if (!existingMenu) {
      throw new CustomError(
        "Menu not found for the given kitchen",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    // Filter out the item to remove it
    const updatedItems = existingMenu.items_id.filter(
      (menuItem) => menuItem.item_id.toString() !== item_id
    );
   
    // If no changes, item was not found in menu
    if (updatedItems.length === existingMenu.items_id.length) {
      throw new CustomError(
        "Item not found in the menu",
        HTTP_STATUS_CODE.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR,
        false
      );
    }

    // Update the menu items
    existingMenu.items_id = updatedItems;

    // Save the updated menu
    await existingMenu.save();

    return sendSuccessResponse(
      res,
      "Item removed from menu successfully",
      existingMenu,
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
