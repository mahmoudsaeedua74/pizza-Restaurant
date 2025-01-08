import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import userSlice from "./features/user/useSlice";
export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice,
  },
});
