import express, { Application, Router } from "express";
import { apiConfig } from "../config/endpoint ";
import {
  handleCreateNewKitchens,
  handleDeleteKitchens,
  handleGetKitchens,
  handleGetKitchensById,
  handleUpdateKitchensById,
} from "../controllers/kitchens/kitchenController";
import upload from "../lib/helpers/uploadMiddleware";

const router = express.Router();

router.post(
  `${apiConfig.kitchens.newkitchens}`,
  upload.fields([
    { name: "kitchen_image", maxCount: 1 },
    { name: "pan_card_image", maxCount: 1 },
    { name: "gst_certificate_image", maxCount: 1 },
    { name: "ffsai_certificate_image", maxCount: 1 },
  ]),
  handleCreateNewKitchens
);
router.get(`${apiConfig.kitchens.getAllkitchens}`, handleGetKitchens);
router.get(`${apiConfig.kitchens.getkitchensById}`, handleGetKitchensById);
router.put(
  `${apiConfig.kitchens.updatekitchens}`,
  upload.fields([
    { name: "kitchen_image", maxCount: 1 },
    { name: "pan_card_image", maxCount: 1 },
    { name: "gst_certificate_image", maxCount: 1 },
    { name: "ffsai_certificate_image", maxCount: 1 },
  ]),
  handleUpdateKitchensById
);


router.delete(`${apiConfig.kitchens.deletekitchens}`, handleDeleteKitchens);

export default router;
