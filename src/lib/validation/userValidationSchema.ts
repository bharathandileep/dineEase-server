
/**
 * 
 * This file defines the Joi validation schema for the User model.
 * It is used to validate incoming request bodies for creating or updating users.
 * *
 */

import Joi from "joi";

export const userValidationSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required().messages({
    "string.min": "Full name should have at least 3 characters",
    "string.max": "Full name should have at most 50 characters",
    "any.required": "Full name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  phone_number: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be a valid phone number",
    }),

  profile_photo: Joi.string().uri().optional().allow(null).messages({
    "string.uri": "Profile photo must be a valid URL",
  }),

  is_deleted: Joi.boolean().default(false).optional(),
}).options({ abortEarly: false });
