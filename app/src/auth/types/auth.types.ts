import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';

export type IUser = Pick<User, 'email' | 'firstName' | 'lastName' | '_id'>;

export interface JwtPayload {
  user: IUser;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

export interface AuthRequest extends Request {
  user: JwtPayload;
}
