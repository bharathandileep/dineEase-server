import mongoose, { Document, Schema, model } from 'mongoose';

// Define an interface for the Employee Management document
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

// Define the Employee Management schema
export const EmployeeManagementSchema: Schema = new Schema<IEmployeeManagement>(
  {
    kitchen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }, // Reference to Kitchen schema
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to Employee schema
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Reference to Organization schema
    username: { type: String, required: true }, // Username of the employee
    email: { type: String, required: true, unique: true }, // Email of the employee
    phone_number: { type: String, required: true }, // Phone number of the employee
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }, // Address reference
    role: { type: String, required: true }, // Role of the employee (e.g., Manager, Cook)
    employee_status: { type: String, required: true }, // Employment status (Active, Inactive, Suspended)
    aadhar_number: { type: String, required: true }, // Aadhar number (for Indian employees)
    pan_number: { type: String, required: true }, // PAN number (for Indian employees)
    profile_picture: { type: String, default: null }, // Profile picture (URL or file path)
    created_at: { type: Date, default: Date.now }, // Timestamp of when the record was created
    updated_at: { type: Date, default: Date.now }, // Timestamp of the last update
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Employee Management model
const EmployeeManagement = mongoose.model<IEmployeeManagement>('EmployeeManagement', EmployeeManagementSchema);
export default EmployeeManagement;
