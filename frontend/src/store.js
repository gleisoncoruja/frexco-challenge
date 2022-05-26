import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoryReducer,
    products: productsReducer,
  },
});
