import express from "express";
import {
  createSubcategory,
  deleteSubcategory,
  getAllSubCategories,
  getSubcategoriesByCategory,
  toggleSubcategoryStatus,
  updateSubcategory,
} from "../../controllers/kitchens/menuSubCategory";
import { apiConfig } from "../../config/endpoint ";
import { getAllCategories } from "../../controllers/kitchens/menuCategoryController";

const router = express.Router();

// Public routes
router.get(`${apiConfig.menu.getSubcategoriesByCategory}`, getSubcategoriesByCategory);
router.post(`${apiConfig.menu.createSubcategory}`, createSubcategory);
router.put(`${apiConfig.menu.updateSubcategory}`, updateSubcategory);
router.delete(`${apiConfig.menu.deleteSubcategory}`, deleteSubcategory);
router.patch(`${apiConfig.menu.toggleSubcategoryStatus}`, toggleSubcategoryStatus);
router.patch(`${apiConfig.menu.toggleSubcategoryStatus}`, getAllCategories);
router.get(`${apiConfig.menu.getAllSubCategories}`, getAllSubCategories);

export default router;
