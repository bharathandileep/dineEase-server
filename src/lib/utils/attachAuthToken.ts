import {
  accessTokenExpiration,
  accessTokenSecret,
  refreshTokenExpiration,
  refreshTokenSecret,
} from "../../config/environment";
import { generateJWTToken } from "../helpers/JWTToken";
import { Response } from "express";

// Function to create and send both and refresh token
export const appendRefreshTokenCookies = (
  res: Response,
  payload: string | object
) => {
  const refreshToken = generateJWTToken(
    refreshTokenSecret,
    payload,
    refreshTokenExpiration
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Set to true only in production (HTTPS required)
    sameSite: "none", // Allows cookies to be sent cross-origin
  });
};
