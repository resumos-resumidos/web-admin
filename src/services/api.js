import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response.data),
);

export default api;