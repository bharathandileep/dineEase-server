import mongoose, { Document, Model } from 'mongoose';
import { EmployeeManagementSchema } from '../../schema/employeemanagement.schema/EmployeeManagement.schema';

export interface IEmployeeManagement extends Document {
  kitchen_id: mongoose.Types.ObjectId;        // Reference to Kitchen schema
  employee_id: mongoose.Types.ObjectId;       // Reference to Employee schema
  organization_id: mongoose.Types.ObjectId;   // Reference to Organization schema
  username: string;                            // Username for the employee
  email: string;                               // Email of the employee
  phone_number: string;                        // Phone number of the employee
  address: mongoose.Types.ObjectId;           // Reference to Address schema
  role: string;                                // Role of the employee (e.g., 'Manager', 'Cook', etc.)
  employee_status: string;                     // Employment status (e.g., 'Active', 'Inactive', 'Suspended')
  aadhar_number: string;                       // Aadhar number (for Indian employees)
  pan_number: string;                          // PAN number (for Indian employees)
  profile_picture: string;                     // URL or file path for the employee's profile picture
  created_at: Date;                            // Timestamp when the record was created
  updated_at: Date;                            // Timestamp when the record was last updated
}

const EmployeeManagement : Model<IEmployeeManagement> = mongoose.model<IEmployeeManagement>('EmployeeManagement',EmployeeManagementSchema)
export default EmployeeManagement;