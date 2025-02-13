import express from "express";
import {
    createOrgEmployee,
    deleteOrgEmployee,
    getAllEmployeesOfOrg,
    getOrgEmployeeById,
  toggleOrgEmployeeStatus,
  updateOrgEmployee,
} from "../../controllers/empmanagment/orgempmanagmentcontroller";
import { apiConfig } from "../../config/endpoint ";
import upload from "../../lib/helpers/uploadMiddleware";

const router = express.Router();

router.get(`${apiConfig.orgemployee.getAllEmployeesOfOrg}`,
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
  ]), getAllEmployeesOfOrg);
router.get(`${apiConfig.orgemployee.getAllEmployeesOfOrg}`, 
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
  ]), getOrgEmployeeById);
router.post(`${apiConfig.orgemployee.createOrgEmployee}`, 
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
  ]),createOrgEmployee);
router.put(`${apiConfig.orgemployee.createOrgEmployee}`, 
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
  ]), updateOrgEmployee);
router.delete(`${apiConfig.orgemployee.deleteOrgEmployee}`, deleteOrgEmployee);
router.patch(`${apiConfig.employee.toggleEmployeeStatus}`, toggleOrgEmployeeStatus);

export default router;
