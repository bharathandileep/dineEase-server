import { Request, Response, NextFunction } from "express";
import { errorBody } from "../lib/interfaces/errorbody.interface";
import { node_env } from "../lib/constants";

export const errorHandler = (
  error: Error & { statusCode?: number; status?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorBody: errorBody = {
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
    status: typeof error.status === "boolean" ? error.status : false,
  };
  if (node_env == "DEVELOPMENT") {
    errorBody.stack = error.stack;
  }
  res.status(errorBody.statusCode).json(errorBody);
};
