import jwt, { SignOptions } from "jsonwebtoken";
type JWTExpiration = number | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`;
 
export const generateJWTToken = (
  tokenSecret: string,
  payload: string | object | Buffer,
  expiration: JWTExpiration
): string => {
  const options: SignOptions = {
    expiresIn: expiration,
  };
  return jwt.sign(payload, tokenSecret, options);
};



export const verifyToken = (token: string, secretKey: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return false;
  }
};
