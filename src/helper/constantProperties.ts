
export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = "domain-name";

export const QueryKeys = {
  USER: "getAllUsers",
  UPDATE_ON_USER: "updateUser",
  PRODUCTS: "getAllProducts",
  UPDATE_ON_PRODUCT: "updateProduct",
} as const;

export const OAuth = {
  GOOGLE_CLIENT_ID: "108771772448-nepm7i9rpjl1s31cnli7u9b2o6vum7ha.apps.googleusercontent.com",
  FACEBOOK_APP_ID: "1329678054928595",
} as const;

export const Routes = {
  PAGE_NOT_FOUND: "*",
  PROFILE_PAGE: "/profilePage",
  UNAUTHORIZED: "/unauthorized",
  PRODUCT_PAGE: "/productpage",
  CHECKOUT_PAGE: "/checkout",

  ADMIN: {
    DASHBOARD: "/admin",
    STATS: "/admin/stats",
    ORDERS: "/admin/orders",
    PRODUCTS: "/admin/products",
    USERS: "/admin/users",
    INVENTORY: "/admin/inventory",
    OFFERS: "/admin/offers",
    STAFF: "/admin/staff",
    ADD_PRODUCT: "/admin/products/add-product",
    EDIT_PRODUCT: "/admin/products/edit-product",
  },
} as const;
