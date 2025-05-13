import { createSlice } from "@reduxjs/toolkit";
import { Pizza } from "../data/menu-items";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type CartItem = Pizza & { quantity: number };

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingItems = state.items.find((existingItem) => existingItem.id === action.payload.id);
      if (!matchingItems) state.items.push({ ...action.payload, quantity: 1 });
      else matchingItems.quantity++;
    },
    removeItem: (state, action: PayloadAction<Pizza>) => {
      const matchingItems = state.items.find((existingItem) => existingItem.id === action.payload.id);
      matchingItems!.quantity--;
      if (matchingItems!.quantity == 0) state.items = state.items.filter((item) => item.id !== matchingItems!.id);
    },
    deleteItem: (state, action: PayloadAction<Pizza>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartItems = (state: RootState) => {
  return state.cart.items;
};

export const selectItemQuantity = (item: Pizza) => {
  return (state: RootState) => {
    const matchingItems = state.cart.items.find((existingItem) => existingItem.id === item.id);
    return matchingItems?.quantity || 0;
  };
};

export const selectPizzasCount = (state: RootState) => {
  return state.cart.items.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const selectCartTotal = (state: RootState) => {
  return state.cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
};

export const { addItem, removeItem, deleteItem, resetCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default persistReducer({ key: "cart", storage }, cartReducer);
