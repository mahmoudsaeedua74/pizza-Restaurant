import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import userSlice from "./features/user/useSlice";
export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice,
  },
});
// نوع `RootState` للحصول على الحالة الكاملة
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
