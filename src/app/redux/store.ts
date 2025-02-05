import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the cartSlice reducer

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Configure and export the store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Adding the cart reducer to the store
  },
});

export default store;
