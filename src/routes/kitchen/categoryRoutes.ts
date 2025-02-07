import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  toggleCategoryStatus,
  updateCategory,
} from "../../controllers/kitchens/menuCategoryController";
import { apiConfig } from "../../config/endpoint ";

const router = express.Router();

router.get(`${apiConfig.menu.getAllCategories}`, getAllCategories);
router.post(`${apiConfig.menu.createCategory}`, createCategory);
router.put(`${apiConfig.menu.updateCategory}`, updateCategory);
router.delete(`${apiConfig.menu.deleteCategory}`, deleteCategory);
router.patch(`${apiConfig.menu.toggleCategoryStatus}`, toggleCategoryStatus);

export default router;
