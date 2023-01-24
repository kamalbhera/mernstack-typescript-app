// import { useContext } from 'react';

import axios from 'axios';
// import axios, { AxiosRequestConfig } from 'axios';

// import { PATHS } from 'src/api';
// import { AuthContext } from 'src/context/authContext';
// import { getCookieByName } from 'src/helpers/getCookieByName';

export const useRequest = () => {
  // const { login, logout } = useContext(AuthContext);

  const api = axios.create();

  // const token = getCookieByName('accessToken');

  // api.interceptors.request.use((config: AxiosRequestConfig) => {
  //   config!.headers!.Authorization = token
  //     ? `Bearer ${getCookieByName('accessToken')}`
  //     : 'not authorized';
  //   return config;
  // });

  // api.interceptors.response.use(
  //   (config: AxiosRequestConfig) => {
  //     return config;
  //   },
  //   async (error) => {
  //     if (!error) {
  //       return;
  //     }
  //     const originalRequest = error.config;
  //     if (
  //       error.response.status === 401 &&
  //       error.config &&
  //       !error.config.isRetry
  //     ) {
  //       // Do not delete (have an influence on updating refresh token. workinkg with tokenFromDb in user.controller.ts)
  //       // if (!token) {
  //       //   return;
  //       // }
  //       originalRequest.isRetry = true;
  //       try {
  //         const response = await axios.post(PATHS.refresh, {
  //           withCredentials: true,
  //         });
  //         login(response.data.tokens.accessToken, response.data.userId);
  //         return api.request(originalRequest);
  //       } catch (e) {
  //         logout();
  //       }
  //     }
  //     throw error;
  //   },
  // );
  return { request: api };
};
