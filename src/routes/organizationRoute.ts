import express, { Application, Router } from "express";
import { apiConfig } from "../config/endpoint ";
import { handleCreateNewOrganisation, handledDeleteOrganisations, handleGetByIdOrganisations, handleGetOrganisations, handleUpdateOrganisations } from "../controllers/organization/organizationsController";

const router = express.Router();

router.post(`${apiConfig.organization.newOrganization}`,handleCreateNewOrganisation)
router.get(`${apiConfig.organization.getAllOrganization}`,handleGetOrganisations)
router.get(`${apiConfig.organization.getOrganizationById}`,handleGetByIdOrganisations)
router.put(`${apiConfig.organization.updateOrganization}`,handleUpdateOrganisations)  
router.delete(`${apiConfig.organization.deleteOrganization}`,handledDeleteOrganisations)  

export default router;