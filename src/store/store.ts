import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { persistStore } from "redux-persist";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: { ignoredActions: ["persist/PERSIST"] } });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
