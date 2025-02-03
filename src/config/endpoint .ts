import { port } from "./environment";

export const apiConfig = {
  baseAPIUrl: `/api/v1`,
  auth: {
    google: "/google-auth",
    sendOtp: "/send-otp",
    loginOtp: "/login-Otp",
    verifyOtp: "/verify-otp",
    verifyLoginOtp: "/verify-loginotp",
    logout: "/logout",
  },
  users: {
    getUser: "/users/:id",
    createUser: "/users",
    updateUser: "/users/:id",
  },
  kitchens: {
    newkitchens: "/new",
    updatekitchens: "/update/:id",
    deletekitchens: "/delete/:kitchenId",
    getAllkitchens: "/all",
    getkitchensById: "/:kitchenId",
  },
  organization: {
    newOrganization: "/new",
    updateOrganization: "/update/:id",
    deleteOrganization: "/delete/:kitchenId",
    getAllOrganization: "/all",
    getOrganizationById: "/:orgId",
  },
};
