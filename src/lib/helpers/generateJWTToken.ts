import jwt from "jsonwebtoken";

export const generateJWTToken = (
  tokenSecret: string,
  payload: any,
  expiration: string
) => {
  return jwt.sign(payload, tokenSecret, {
    expiresIn: expiration,
  });
};
 