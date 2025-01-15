import mongoose, { Document, Model } from 'mongoose';
import { EmployeeManagementSchema } from '../../schema/employeemanagement.schema/EmployeeManagement.schema';

export interface IEmployeeManagement extends Document {
  kitchen_id: mongoose.Types.ObjectId;        
  employee_id: mongoose.Types.ObjectId;       
  organization_id: mongoose.Types.ObjectId;   
  username: string;                            
  email: string;                              
  phone_number: string;                        
  address: mongoose.Types.ObjectId;          
  role: string;                                
  employee_status: string;                    
  aadhar_number: string;                       
  pan_number: string;                         
  profile_picture: string;                     
  created_at: Date;                            
  updated_at: Date;                           
  is_deleted: boolean;                 

}

const EmployeeManagement : Model<IEmployeeManagement> = mongoose.model<IEmployeeManagement>('EmployeeManagement',EmployeeManagementSchema)
export default EmployeeManagement;