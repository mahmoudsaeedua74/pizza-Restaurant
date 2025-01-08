import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define the types for cart item and initial state
interface CartItem {
  pizzaId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface CartState {
  cart: CartItem[];
}

// Initial state with the CartState type
const initialState: CartState = {
  cart: [],
};

// Define the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.cart.push(action.payload);
      toast.success("Item added to cart");
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      toast.success("Item removed from cart");

    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      toast.success("Item added to cart");
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        toast.success("Item removed from cart");
        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
    clearItem(state) {
      toast.success("your cart is cleared");
      state.cart = [];
    },
  },
});

// Export actions and reducer
export const {
  addItem,
  deleteItem,
  clearItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getCarts = (state: { cartSlice: CartState }) =>
  state.cartSlice.cart;

export const getTotalQuantity = (state: { cartSlice: CartState }) =>
  state.cartSlice.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state: { cartSlice: CartState }) =>
  state.cartSlice.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById =
  (id: string) => (state: { cartSlice: CartState }) =>
    state.cartSlice.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
