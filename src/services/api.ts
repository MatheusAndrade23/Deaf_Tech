import axios, { AxiosInstance, AxiosError } from 'axios';

import { AppError } from '@utils/AppError';

const api = axios.create({
  baseURL: 'http://10.0.11.27:3000',
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
