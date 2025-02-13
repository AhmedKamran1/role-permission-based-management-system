const router = require("express").Router();

// controller
const {
  getAllUsers,
  updateAdminStatus,
  updateModeratorStatus,
  updateModeratorPermissions,
  removeAdmin,
  updateAdmin,
  updateModerator,
  removeModerator,
  getAllAdmins,
  getAllModerators,
  getAllBasicUsers,
} = require("../controllers/users");

// middlewares
const { validateRequest } = require("../middlewares/validate-request");
const {
  authenticateTokenType,
} = require("../middlewares/authenticate-token-types");
const { authorize } = require("../middlewares/authorize");
const authenticate = require("../middlewares/authenticate");

// validation
const {
  signupSchema,
  loginSchema,
  passwordSchema,
} = require("../utils/validation-schema/auth");

// constants
const TOKENTYPES = require("../utils/constants/token-types");
const { ROLES } = require("../utils/constants/roles");
const { PERMISSION_ENUM } = require("../utils/constants/permissions");

// Routes
router.get("/all-users", [authenticate, authorize([ROLES.ADMIN])], getAllUsers);

router.get(
  "/all-admins",
  [
    authenticate,
    authorize([ROLES.ADMIN, ROLES.MODERATOR], [PERMISSION_ENUM.VIEW_ADMINS]),
  ],
  getAllAdmins
);
router.get(
  "/all-moderators",
  [authenticate, authorize([ROLES.ADMIN, ROLES.MODERATOR])],
  getAllModerators
);
router.get("/all-basic-users", [authenticate], getAllBasicUsers);

router.patch(
  "/update-admin-status/:id",
  [
    authenticate,
    authorize([ROLES.ADMIN], [PERMISSION_ENUM.MANAGE_ADMIN_STATUS]),
  ],
  updateAdminStatus
);
router.patch(
  "/update-moderator-status/:id",
  [
    authenticate,
    authorize([ROLES.ADMIN], [PERMISSION_ENUM.MANAGE_MODERATOR_STATUS]),
  ],
  updateModeratorStatus
);
router.patch(
  "/update-admin/:id",
  [authenticate, authorize([ROLES.ADMIN], [PERMISSION_ENUM.MANAGE_ADMIN])],
  updateAdmin
);
router.patch(
  "/update-moderator/:id",
  [
    authenticate,
    authorize(
      [ROLES.ADMIN, ROLES.MODERATOR],
      [PERMISSION_ENUM.MANAGE_MODERATOR]
    ),
  ],
  updateModerator
);
router.patch(
  "/update-moderator-permissions/:id",
  [
    authenticate,
    authorize(
      [ROLES.ADMIN, ROLES.MODERATOR],
      [PERMISSION_ENUM.MANAGE_MODERATOR]
    ),
  ],
  updateModeratorPermissions
);
router.patch(
  "/remove-admin/:id",
  [authenticate, authorize([ROLES.ADMIN], [PERMISSION_ENUM.MANAGE_ADMIN])],
  removeAdmin
);
router.patch(
  "/remove-moderator/:id",
  [
    authenticate,
    authorize(
      [ROLES.ADMIN, ROLES.MODERATOR],
      [PERMISSION_ENUM.MANAGE_MODERATOR]
    ),
  ],
  removeModerator
);

module.exports = router;
