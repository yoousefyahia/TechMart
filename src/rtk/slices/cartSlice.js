import { createSlice } from "@reduxjs/toolkit";

const sliceName = "cartSlice";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: sliceName,
  initialState: loadCartFromStorage(),
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
      saveCartToStorage(state);
    },
    removeFromCart(state, action) {
      const newState = state.filter((product) => product.id !== action.payload.id);
      saveCartToStorage(newState);
      return newState;
    },

    increase(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      if (product && product.qyt < product.stock) {
        product.qyt += 1;
        saveCartToStorage(state);
      }
    },
    decrease(state, action) {
      const product = state.find((product) => product.id === action.payload.id);
      if (product && product.qyt > 1) {
        product.qyt -= 1;
        saveCartToStorage(state);
      }
    },

    clearCart() {
      saveCartToStorage([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increase, decrease } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
