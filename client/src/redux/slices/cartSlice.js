import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      if (!(state.cartItems.filter((x) => x._id === payload._id).length > 0)) {
        state.cartItems.push(payload);
        window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    localStorageCart: (state, { payload }) => {
      state.cartItems = payload || [];
    },
    cleanCart: (state) => {
      state.cartItems = initialState.cartItems;
      window.localStorage.setItem("cart", JSON.stringify([]));
    },
    cleanItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== payload);
      window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addItemToCart, localStorageCart, cleanCart, cleanItem } = cartSlice.actions;
export default cartSlice.reducer;
