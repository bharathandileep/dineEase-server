import express, { Application, Router } from "express";
import { apiConfig } from "../config/endpoint ";
import {
  handleCreateNewOrganisation,
  handledDeleteOrganisations,
  handleGetByIdOrganisations,
  handleGetOrganisations,
  handleUpdateOrganisations,
} from "../controllers/organization/organizationsController";
import upload from "../lib/helpers/uploadMiddleware";

const router = express.Router();

router.post(
  apiConfig.organization.newOrganization,
  upload.fields([
    { name: "organizationLogo", maxCount: 1 },
    { name: "panCardImage", maxCount: 1 },
    { name: "gstCertificateImage", maxCount: 1 },
  ]),
  handleCreateNewOrganisation
);
router.get(
  `${apiConfig.organization.getAllOrganization}`,
  handleGetOrganisations
);
router.get(
  `${apiConfig.organization.getOrganizationById}`,
  handleGetByIdOrganisations
);
router.put(
  `${apiConfig.organization.updateOrganization}`,
  upload.fields([
    { name: "organizationLogo", maxCount: 1 },
    { name: "panCardImage", maxCount: 1 },
    { name: "gstCertificateImage", maxCount: 1 },
  ]),
  handleUpdateOrganisations
);
router.delete(
  `${apiConfig.organization.deleteOrganization}`,
  handledDeleteOrganisations
);

export default router;
