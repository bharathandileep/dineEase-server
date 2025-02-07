import express from "express";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategory,
  toggleSubcategoryStatus,
  updateSubcategory,
} from "../../controllers/kitchens/menuSubCategory";
import { apiConfig } from "../../config/endpoint ";

const router = express.Router();

// Public routes
router.get(`${apiConfig.menu.getSubcategoriesByCategory}`, getSubcategoriesByCategory);
router.post(`${apiConfig.menu.createSubcategory}`, createSubcategory);
router.put(`${apiConfig.menu.updateSubcategory}`, updateSubcategory);
router.delete(`${apiConfig.menu.deleteSubcategory}`, deleteSubcategory);
router.patch(`${apiConfig.menu.toggleSubcategoryStatus}`, toggleSubcategoryStatus);

export default router;
