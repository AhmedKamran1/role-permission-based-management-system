import { ROLE_PERMISSIONS } from '@/utils/permissions';

export const hasPermission = (userRole, requiredPermission) => {
  return ROLE_PERMISSIONS[userRole].includes(requiredPermission);
};
