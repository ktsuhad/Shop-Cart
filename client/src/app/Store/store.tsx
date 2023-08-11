import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../../Features/authSlice";
import productReducer from "../../Features/productSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer
  },
});

export default store;
