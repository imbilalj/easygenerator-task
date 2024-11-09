import { AxiosResponse } from 'axios';
import apiInstance from './apiInstance';
import {
  LoginFormValues,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupFormValues,
  SignupRequest,
  SignupResponse,
} from '../types';

export const login = async (loginFormValues: LoginFormValues) => {
  const { data: response } = await apiInstance.post<
    LoginRequest,
    AxiosResponse<LoginResponse>
  >('/auth/login', loginFormValues);

  return response;
};

export const signup = async (signupFormValues: SignupFormValues) => {
  const { data: response } = await apiInstance.post<
    SignupRequest,
    AxiosResponse<SignupResponse>
  >('/auth/signup', signupFormValues);

  return response;
};

export const logout = async () => {
  const { data: response } = await apiInstance.post<
    void,
    AxiosResponse<LogoutResponse>
  >('/auth/logout');

  return response;
};
