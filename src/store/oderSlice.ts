import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./CartSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  creditCardNum: string;
  state: "ready" | "pending";
};

interface OrderState {
  items: Order[];
}

const initialState: OrderState = {
  items: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      const maskedCCRegex = /\d(?=(?:\D*\d){4})/;
      const maskedCCnumber = action.payload.creditCardNum.replace(maskedCCRegex, "*");
      const newOrder = {
        ...action.payload,
        creditCardNum: maskedCCnumber,
      };
      state.items.push(newOrder);
    },
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createOrder, removeOrder } = orderSlice.actions;
const OrderReducer = orderSlice.reducer;

export default persistReducer(
  {
    key: "orders",
    storage,
  },
  OrderReducer
);
