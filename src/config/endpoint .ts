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
    adminLogin: "/admin/login",
    adminRegister: "/admin/register",
    accessToken: "/new/access-token",
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

    createCategory: "/categories",
    getAllCategories: "/categories/all",
    updateCategory: "/categories/:id",
    deleteCategory: "/categories/:id",
    toggleCategoryStatus: "/categories/:id/toggle-status",

    getAllSubCategories: "/subcategories/all",
    createSubcategory: "/subcategories",
    getSubcategoriesByCategory: "/categories/:categoryId/subcategories",
    getSubcategoryById: "/subcategories/:id",
    updateSubcategory: "/subcategories/:id",
    deleteSubcategory: "/subcategories/:id",
    toggleSubcategoryStatus: "/subcategories/:id/toggle-status",
  },
  menu: {
    createCategory: "/categories",
    getAllCategories: "/categories",
    updateCategory: "/categories/:id",
    deleteCategory: "/categories/:id",
    toggleCategoryStatus: "/categories/:id/toggle-status",

    getAllSubCategories: "/subcategories",
    createSubcategory: "/subcategories",
    getSubcategoriesByCategory: "/categories/:categoryId/subcategories",
    getSubcategoryById: "/subcategories/:id",
    updateSubcategory: "/subcategories/:id",
    deleteSubcategory: "/subcategories/:id",
    toggleSubcategoryStatus: "/subcategories/:id/toggle-status",
  },
  organization: {
    newOrganization: "/new",
    updateOrganization: "/update/:id",
    deleteOrganization: "/delete/:kitchenId",
    getAllOrganization: "/all",
    getOrganizationById: "/:orgId",
  },
};
