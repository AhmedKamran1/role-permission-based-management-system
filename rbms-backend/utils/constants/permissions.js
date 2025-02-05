const PERMISSION_ENUM = {
  MANAGE_ADMIN_STATUS: {
    value: "manage-admin-status",
    isAdminOnly: true,
  },
  MANAGE_MODERATOR_STATUS: {
    value: "manage-moderator-status",
    isAdminOnly: false,
  },
  MANAGE_ADMIN: {
    value: "manage-admin",
    isAdminOnly: true,
  },
  MANAGE_MODERATOR: {
    value: "manage-moderator",
    isAdminOnly: false,
  },
  MANAGE_USER: {
    value: "manage-user",
    isAdminOnly: false,
  },
  VIEW_USERS: {
    value: "view-users",
    isAdminOnly: false,
  },
  VIEW_MODERATORS: {
    value: "view-moderators",
    isAdminOnly: false,
  },
  VIEW_ADMINS: {
    value: "view-admins",
    isAdminOnly: false,
  },
};

const FIXED_MODERATOR_PERMISSIONS = [
  PERMISSION_ENUM.MANAGE_USER.value,
  PERMISSION_ENUM.VIEW_MODERATORS.value,
  PERMISSION_ENUM.VIEW_USERS.value,
];

const DYNAMIC_MODERATOR_PERMISSIONS = [
  PERMISSION_ENUM.MANAGE_MODERATOR.value,
  PERMISSION_ENUM.VIEW_ADMINS.value,
];

const ROLE_PERMISSIONS = {
  ADMIN: {
    SUPER_ADMIN: [
      PERMISSION_ENUM.MANAGE_ADMIN_STATUS.value,
      PERMISSION_ENUM.MANAGE_MODERATOR_STATUS.value,
      PERMISSION_ENUM.MANAGE_ADMIN.value,
      PERMISSION_ENUM.MANAGE_MODERATOR.value,
      PERMISSION_ENUM.MANAGE_USER.value,
      PERMISSION_ENUM.VIEW_ADMINS.value,
      PERMISSION_ENUM.VIEW_MODERATORS.value,
      PERMISSION_ENUM.VIEW_USERS.value,
    ],
    BASIC_ADMIN: [
      PERMISSION_ENUM.MANAGE_MODERATOR_STATUS.value,
      PERMISSION_ENUM.MANAGE_MODERATOR.value,
      PERMISSION_ENUM.MANAGE_USER.value,
      PERMISSION_ENUM.VIEW_ADMINS.value,
      PERMISSION_ENUM.VIEW_MODERATORS.value,
      PERMISSION_ENUM.VIEW_USERS.value,
    ],
  },
  MODERATOR: [...FIXED_MODERATOR_PERMISSIONS],
  USER: [
    PERMISSION_ENUM.VIEW_MODERATORS.value,
    PERMISSION_ENUM.VIEW_USERS.value,
  ],
};

module.exports = {
  ROLE_PERMISSIONS,
  PERMISSION_ENUM,
  FIXED_MODERATOR_PERMISSIONS,
  DYNAMIC_MODERATOR_PERMISSIONS,
};
