import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../lib/helpers/responseHelper";
import { HTTP_STATUS_CODE } from "../../lib/constants/httpStatusCodes";
import { ERROR_TYPES } from "../../lib/constants/errorType";
import mongoose from "mongoose";
import { CustomError } from "../../lib/errors/customError";
import { validateMogooseObjectId } from "../../lib/helpers/validateObjectid";
import { uploadFileToCloudinary } from "../../lib/utils/cloudFileManager";
import Country from "../../models/country/Country";
import State from "../../models/state/StateModel";
import City from "../../models/city/City";
import District from "../../models/district/District";

export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("inside getallcountries controller");
      
      const countries = await Country.find();
      console.log(countries)
      
      res.status(200).json({
        success: true,
        data: countries,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the countries.",
      });
    }
  };
  
  export const getStatesByCountry = async (req: Request, res: Response): Promise<void> => {
    try {
      const { countryName } = req.params;
      const states = await State.find({ country_name: countryName });
  
      if (states.length === 0) {
        res.status(404).json({
          success: false,
          message: `No states found for country: ${countryName}`,
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        data: states,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the states.",
      });
    }
  };
  
  export const getCitiesByState = async (req: Request, res: Response): Promise<void> => {
    try {
      const { stateName } = req.params;
      console.log(stateName,"heloo");
      
      const cities = await City.find({ state_id: stateName });
  console.log(cities);
  
      if (cities.length === 0) {
        res.status(404).json({
          success: false,
          message: `No cities found for state ID: ${stateName}`,
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        data: cities,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the cities.",
      });
    }
  };
  
export const getDistrictsByState = async(req:Request,res:Response):Promise<void>=>{
    try{
        const{stateId} = req.params;
        const districts = await District.find({state_id:stateId});

        if(districts.length==0){
            res.status(404).json({
                success:false,
                message:`No districts found for state Id:${stateId}`,
            });
            return
        }
        res.status(200).json({
            success:true,
            data:districts,
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"An error occured while fetching the districts"
        });
        
    }
};

// export const getcitiesByDistricts = async(req:Request,res:Response):Promise<void>=>{
//     try{
//         const{districtName}= req.params;
//         const cities = await City.find({district_name:districtName});

//         if(cities.length === 0 ){
//             res.status(404).json({
//                 success:false,
//                 message:`No cities found for district :${districtName}`,
//             });
//             return;
//         }
//         res.status(200).json({
//             success:true,
//             data:cities,
//         });
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({
//             success:false,
//             message:"An error occured while fetching the cities"
//         })
//     }
// }