import axios, { AxiosInstance, AxiosError } from 'axios';

import { AppError } from '@utils/AppError';

const api = axios.create({
  baseURL: 'http://192.168.1.102:3333',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError('Erro no servidor. Tente novamente mais tarde!'),
      );
    }
  },
);

export { api };
