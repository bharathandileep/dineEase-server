import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/helpers/JWTToken";
import { refreshTokenSecret } from "../config/environment";

export const refreshTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token missing" });
  }
  const decode = verifyToken(refreshToken, refreshTokenSecret);
  if (!decode) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
  req.body.payload = decode;
  next();
};
