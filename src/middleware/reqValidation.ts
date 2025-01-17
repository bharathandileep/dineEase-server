import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

/**
 * middleware for validating incoming request bodies using Joi schemas.
 */

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};
