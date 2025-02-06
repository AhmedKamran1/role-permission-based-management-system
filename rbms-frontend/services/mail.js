import api from './api';
import { PORTS } from '@/utils/port';

const service = 'mail';
const port = PORTS[service];

export const forgotPassword = (email) => {
  return api.get(`http://localhost:${port}/api/${service}/forgot-password/${email}`);
};

export const resendConfirmation = (email) => {
  return api.get(`http://localhost:${port}/api/${service}/resend-confirmation/${email}`);
};
