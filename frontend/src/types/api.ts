import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = User;

export interface SignupRequest extends Omit<User, '_id'> {
  password: string;
}

export type SignupResponse = User;

export type GetUserResponse = User;

export interface LogoutResponse {
  message: string;
}
