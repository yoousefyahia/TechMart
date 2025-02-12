import { createSlice } from "@reduxjs/toolkit";

const sliceName = "cartSlice";

const cartSlice = createSlice({
  name: sliceName,
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.qyt += 1;
      }
      else {
        const newProduct = { ...action.payload, qyt: 1 };
        state.push(newProduct);
      }
    },
    removeFromCart(state, action) {
      return state.filter((product) => product.id !== action.payload.id);
    },

    increase(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      if (product.qyt !== product.stock) {
        product.qyt += 1;
      }
    },
    decrease(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      if (product.qyt !== 1) {
        product.qyt -= 1;
      }
    },

    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increase, decrease } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
