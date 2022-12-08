import { useAuth } from "hooks/useAuth";
import { store } from "store/store";
import { IUser } from "../types/user.interface";
import { axiosAPI } from "./axios.service";

export const USER = "user";

const state = store.getState();
const token = state.auth.token;
export const userService = {
  getPersonalInfo: async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const req = await axiosAPI.get<IUser>(`/${USER}/personal`, {
      headers,
    });
    return req;
  },
};
