import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "../data/menu-items";
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

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((item) => item.id == action.payload.id);
      if (!matchingPizza) state.items.push({ ...action.payload, quantity: 1 });
      else matchingPizza.quantity++;
    },
    removeItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((item) => item.id === action.payload.id);
      matchingPizza!.quantity--;
      if (matchingPizza?.quantity == 0) {
        state.items = state.items.filter((item) => item.id !== matchingPizza.id);
      }
    },
    deleteItem: (state, action: PayloadAction<Pizza>) => {
      const matchingPizza = state.items.find((item) => item.id === action.payload.id);
      state.items = state.items.filter((item) => item.id !== matchingPizza!.id);
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

const cartReducer = CartSlice.reducer;

export const { addItem, removeItem, deleteItem, resetCart } = CartSlice.actions;

export const selectCartItem = () => {
  return (state: RootState) => {
    return state.cart.items;
  };
};

export const selectItemQuantity = (item: Pizza) => {
  return (state: RootState) => {
    const matchingPizza = state.cart.items.find((matchingitem) => item.id === matchingitem.id);
    return matchingPizza?.quantity || 0;
  };
};

export const sumOfQty = () => {
  return (state: RootState) => {
    return state.cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
  };
};

export const sumOfAmount = () => {
  return (state: RootState) => {
    const balance = state.cart.items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    return parseFloat(balance.toFixed(3));
  };
};

export default persistReducer(
  {
    key: "cart",
    storage,
  },
  cartReducer
);
