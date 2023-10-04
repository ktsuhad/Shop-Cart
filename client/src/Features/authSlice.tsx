import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/BaseUrl/axiosInstance";
import { AppThunk } from "../app/Store/store";
import { UserInterface } from "../interfaces/UserInterface";

interface AuthState {
  loading: boolean;
  user: UserInterface | null;
  isAuthenticated: boolean;
}
const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
  loading: false,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<UserInterface>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginfailure(state) {
      state.loading = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;

      // Remove the access token from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, loginfailure, logout } =
  authSlice.actions;
export default authSlice.reducer; // This exports the authReducer

//thunk for login
export const login =
  (formdata: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await axiosInstance.post(`/login`, formdata);

      if (data && data.success) {
        dispatch(loginSuccess(data.user));
        // Save token and user data in localStorage
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        dispatch(loginfailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(loginfailure());
    }
  };
