import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../../Features/authSlice";

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
  },
});

export default store;
