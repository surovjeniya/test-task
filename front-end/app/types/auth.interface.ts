import { Gender } from "../components/Auth/Auth";
import { IUser } from "./user.interface";

export interface IAuthResponse {
  user: IUser | null;
  token: String;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword?: string;
}
