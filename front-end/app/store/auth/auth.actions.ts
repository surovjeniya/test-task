import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { toastrError } from "utils/api.utils";
import { authService } from "../../services/auth.service";
import { IAuthResponse, RegisterDto } from "../../types/auth.interface";

export const register = createAsyncThunk<IAuthResponse, RegisterDto>(
  "auth/register",
  async (dto: RegisterDto, thunkAPI) => {
    try {
      const response = await authService.register(dto);
      return response;
    } catch (e) {
      toastrError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await authService.login(email, password);
    return response;
  } catch (e) {
    toastrError(e);
    return thunkAPI.rejectWithValue(e);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return {};
});
