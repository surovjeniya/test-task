import { createSlice } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../types/auth.interface";
import { login, logout, register } from "./auth.actions";

interface AuthInitialState extends IAuthResponse {
  isLoading: boolean;
}

const initialState: AuthInitialState = {
  user: null,
  token: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(register.rejected, state => {
      state.isLoading = false;
      state.user = null;
      state.token = "";
    });
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
    });
    builder.addCase(login.rejected, state => {
      state.isLoading = false;
      state.token = "";
      state.user = null;
    });
    builder.addCase(logout.fulfilled, state => {
      state.isLoading = false;
      state.user = null;
      state.token = "";
    });
  },
});
