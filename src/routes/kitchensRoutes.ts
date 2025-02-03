import express, { Application, Router } from "express";
import { apiConfig } from "../config/endpoint ";
import {
  handleCreateNewKitchens,
  handleDeleteKitchens,
  handleGetKitchens,
  handleGetKitchensById,
  handleUpdateKitchensById,
} from "../controllers/kitchens/kitchenController";

const router = express.Router();

router.post(`${apiConfig.kitchens.newkitchens}`, handleCreateNewKitchens);
router.get(`${apiConfig.kitchens.getAllkitchens}`, handleGetKitchens);
router.get(`${apiConfig.kitchens.getkitchensById}`, handleGetKitchensById);
router.put(`${apiConfig.kitchens.updatekitchens}`, handleUpdateKitchensById);
router.delete(`${apiConfig.kitchens.deletekitchens}`, handleDeleteKitchens);

export default router;      
