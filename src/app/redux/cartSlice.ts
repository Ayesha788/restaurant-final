import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

// Define the structure of the entire cart state
interface CartState {
  items: CartItem[];
}

// Initial state of the cart
const initialState: CartState = {
  items: [],
};

// Create the cart slice using Redux Toolkit
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Action to remove an item from the cart
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Action to increase the quantity of an item
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Action to decrease the quantity of an item
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
  },
});

// Export actions
export const {
  addToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
