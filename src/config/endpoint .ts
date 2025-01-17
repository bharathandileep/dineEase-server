import { port } from "./environment";

export const apiConfig = {
  baseAPIUrl: `/api/v1`,
  auth: {
    loginGoogle: "/login-google",
    register: "/register",
    logout: "/logout",
  },
  users: {
    getUser: "/users/:id",
    createUser: "/users",
    updateUser: "/users/:id",
  },
};
