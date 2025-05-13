import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import persistStore from "redux-persist/es/persistStore";
import orderReducer from "./oderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    });
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
