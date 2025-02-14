import express, { Application, Router } from "express";
import { apiConfig } from "../../config/endpoint ";
import {
  kitchenCreateCategory,
  kitchenDeleteCategory,
  kitchenGetAllCategories,
  kitchenToggleCategoryStatus,
  kitchenUpdateCategory,
} from "../../controllers/kitchens/kitchenCategory";
import {
  addMenuItems,
  getAllMenus,
  removeMenuItem,
} from "../../controllers/kitchens/menuController";

const router = express.Router();

//kitchen category routes
router.get(`${apiConfig.kitchenMenu.getKitchenMenu}`, getAllMenus);
router.get(`${apiConfig.kitchenMenu.removekitchenMenu}`, removeMenuItem);
router.post(`${apiConfig.kitchenMenu.createkitchenMenu}`, addMenuItems);

router.put(`${apiConfig.kitchens.updateCategory}`, kitchenUpdateCategory);
router.delete(`${apiConfig.kitchens.deleteCategory}`, kitchenDeleteCategory);
router.patch(
  `${apiConfig.menu.toggleCategoryStatus}`,
  kitchenToggleCategoryStatus
);

export default router;
