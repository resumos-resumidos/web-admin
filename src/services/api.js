import axios from 'axios';

import { getAccessToken } from './accessToken/localStorage';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const newConfig = config;

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response.data),
);

export default api;
