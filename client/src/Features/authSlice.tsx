import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../app/Store/store";

interface AuthState {
  loading: boolean;
  user: any;
  isAuthenticated: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: any;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginfailure(state) {
      state.loading = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;

      // Remove the access token from localStorage
      localStorage.removeItem("accessToken")

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
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/login`,
        formdata
      );
      const { data } = response;

      if (data && data.success) {
        dispatch(loginSuccess(data.user));
        // Save token in localStorage
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        dispatch(loginfailure());
      }
    } catch (error) {
      console.log(error);
      dispatch(loginfailure());
    }
  };
