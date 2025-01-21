import { port } from "./environment";

export const apiConfig = {
  baseAPIUrl: `/api/v1`,
  auth: {
    google: "/google-auth",
    sendOtp: "/send-otp",
    logout: "/logout",
  },
  users: {
    getUser: "/users/:id",
    createUser: "/users",
    updateUser: "/users/:id",
  },
};
