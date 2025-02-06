export const PERMISSIONS = {
  MANAGE_ADMIN_STATUS: 'manage-admin-status',
  MANAGE_MODERATOR_STATUS: 'manage-moderator-status',
  MANAGE_ADMIN: 'manage-admin',
  MANAGE_MODERATOR: 'manage-moderator',
  MANAGE_USER: 'manage-user',
  VIEW_USERS: 'view-users',
  VIEW_MODERATORS: 'view-moderators',
  VIEW_ADMINS: 'view-admins',
};

export const ASSIGNABLE_MODERATOR_PERMISSIONS = [
  PERMISSIONS.MANAGE_MODERATOR,
  PERMISSIONS.VIEW_ADMINS,
];
