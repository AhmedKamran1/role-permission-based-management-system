import api from './api';
import { PORTS } from '@/utils/port';

const service = 'auth';
const port = PORTS[service];

const service2 = 'login';
const port2 = PORTS[service2];

export const checkEmail = (email) => {
  return api.get(`http://localhost:${port}/api/${service}/check-email?email=${email}`);
};

export const login = (payload) => {
  return api.post(`http://localhost:${port2}/api/${service2}`, payload);
};

export const signup = (payload) => {
  return api.post(`http://localhost:${port}/api/${service}/register`, payload);
};

export const verifyAccount = (token) => {
  return api.get(`http://localhost:${port}/api/${service}/verify?token=${token}`);
};

export const updatePassword = (token, payload) => {
  return api.patch(
    `http://localhost:${port}/api/${service}/update-password?token=${token}`,
    payload
  );
};
