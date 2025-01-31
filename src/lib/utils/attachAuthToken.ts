import { accessTokenExpiration, accessTokenSecret, refreshTokenExpiration, refreshTokenSecret } from "../../config/environment";
import { generateJWTToken } from "./generateJWTToken";
import { Response } from "express";


// Function to create and send both access token and refresh token
export const handleTokens = (
  res: Response,
  payload: string | object,
) => {
  const accessToken = generateJWTToken(accessTokenSecret, payload, accessTokenExpiration);
  const refreshToken = generateJWTToken(refreshTokenSecret, payload, refreshTokenExpiration);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.setHeader("x-access-token", accessToken);
};
