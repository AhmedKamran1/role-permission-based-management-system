import api from './api';

const service = 'user';
const port = 5001;

export const getAllAdmins = () => {
  return api.get(`http://localhost:${port}/api/${service}/all-admins`);
};

export const getAllModerators = () => {
  return api.get(`http://localhost:${port}/api/${service}/all-moderators`);
};

export const getAllBasicUsers = () => {
  return api.get(`http://localhost:${port}/api/${service}/all-basic-users`);
};
