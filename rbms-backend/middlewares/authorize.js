const { ForbiddenRequestError } = require("../utils/errors");

const authorize = (roles, permissions = []) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;
    const userRole = req.user.role;

    // Check if the user has the required role
    if (!roles.includes(userRole)) {
      throw ForbiddenRequestError("Forbidden Access");
    }

    // Check if the user has all required permissions
    if (
      permissions.length > 0 &&
      !permissions.every((permission) => userPermissions.includes(permission))
    ) {
      throw ForbiddenRequestError("Forbidden Access: Insufficient Permissions");
    }

    next();
  };
};

module.exports = { authorize };
