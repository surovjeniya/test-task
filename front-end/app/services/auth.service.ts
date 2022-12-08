import { IAuthResponse, RegisterDto } from "../types/auth.interface";
import { axiosAPI } from "./axios.service";

export const AUTH = "auth";
export const authService = {
  register: async (registerDto: RegisterDto) => {
    const { data: auth } = await axiosAPI.post<IAuthResponse>(
      `/${AUTH}/register`,
      { ...registerDto }
    );
    return auth;
  },
  login: async (email: string, password: string) => {
    const { data: auth } = await axiosAPI.post<IAuthResponse>(
      `/${AUTH}/login`,
      { email, password }
    );
    return auth;
  },
};
