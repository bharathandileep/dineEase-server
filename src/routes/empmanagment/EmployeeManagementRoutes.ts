import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  toggleEmployeeStatus,
  updateEmployee,
} from "../../controllers/empmanagment/empmanagmentcontroller";
import { apiConfig } from "../../config/endpoint ";

const router = express.Router();

router.get(`${apiConfig.employee.getAllEmployees}`, getAllEmployees);
router.get(`${apiConfig.employee.getEmployeeById}`, getEmployeeById);
router.post(`${apiConfig.employee.createEmployee}`, createEmployee);
router.put(`${apiConfig.employee.updateEmployee}`, updateEmployee);
router.delete(`${apiConfig.employee.deleteEmployee}`, deleteEmployee);
router.patch(`${apiConfig.employee.toggleEmployeeStatus}`, toggleEmployeeStatus);

export default router;
