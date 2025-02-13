import { ROLE_PERMISSIONS } from '@/utils/permissions';

export const hasPermission = (userRole, userPermissions, requiredPermission) => {
  return (
    ROLE_PERMISSIONS[userRole].includes(requiredPermission) &&
    userPermissions.includes(requiredPermission)
  );
};
