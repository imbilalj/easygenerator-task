import axios, { AxiosInstance } from 'axios';

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// apiInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       console.log('Here');
//       console.log('error.response.status', error.response.status);
//       // Redirect to login or refresh token
//     }
//     return Promise.reject(error);
//   }
// );

export default apiInstance;
