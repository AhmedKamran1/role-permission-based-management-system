const router = require("express").Router();

// controller
const {
  getAllUsers,
  updateAdminStatus,
  updateModeratorStatus,
  updateAdminLevel,
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
const ROLES = require("../utils/constants/roles");
const { PERMISSION_ENUM } = require("../utils/constants/permissions");

// Routes
router.get("/all-users", [authenticate, authorize([ROLES.ADMIN])], getAllUsers);
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
  "/update-admin-level/:id",
  [authenticate, authorize([ROLES.ADMIN], [PERMISSION_ENUM.MANAGE_ADMIN])],
  updateAdminLevel
);

module.exports = router;
