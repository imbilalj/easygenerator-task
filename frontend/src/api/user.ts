import apiInstance from './apiInstance';
import { GetUserResponse } from '../types';

export const getUser = async () => {
  const { data: response } = await apiInstance.get<GetUserResponse>('/users');

  return response;
};
