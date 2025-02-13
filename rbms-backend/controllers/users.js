const jwt = require("jsonwebtoken");

// Models
const User = require("../models/user");

// utils
const {
  BadRequestError,
  ForbiddenRequestError,
  NotFoundError,
} = require("../utils/errors");
const TOKENTYPES = require("../utils/constants/token-types");
const { sendMail } = require("../utils/mailer");
const { validatePassword } = require("../utils/password");
const {
  ROLE_PERMISSIONS,
  FIXED_MODERATOR_PERMISSIONS,
  DYNAMIC_MODERATOR_PERMISSIONS,
} = require("../utils/constants/permissions");
const STATUS = require("../utils/constants/status");
const { ROLES, SUBROLES } = require("../utils/constants/roles");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

// Get all admins
const getAllAdmins = async (req, res) => {
  const users = await User.find({ role: ROLES.ADMIN });
  res.send(users);
};

// Get all moderators
const getAllModerators = async (req, res) => {
  const users = await User.find({ role: ROLES.MODERATOR });
  res.send(users);
};

// Get all basic users
const getAllBasicUsers = async (req, res) => {
  const users = await User.find({ role: ROLES.USER });
  res.send(users);
};

// update admin to approved/rejected from pending
const updateAdminStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (user.role !== ROLES.ADMIN) throw BadRequestError("Invalid Role");

  if (status === STATUS.APPROVED)
    user.set({
      status,
      subRole: SUBROLES.BASIC_ADMIN,
      permissions: ROLE_PERMISSIONS.ADMIN.BASIC_ADMIN,
    });
  else user.set({ status });

  res.send(user);
};

// update moderator to approved/rejected from pending
const updateModeratorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (user.role !== ROLES.MODERATOR) throw BadRequestError("Invalid Role");

  if (status === STATUS.APPROVED)
    user.set({ status, permissions: ROLE_PERMISSIONS.MODERATOR });
  else user.set({ status });

  await user.save();

  res.send(user);
};

// update user/moderator to admin or update basic/super level
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { level } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (!ROLE_PERMISSIONS.ADMIN[level]) throw BadRequestError("Invalid Level");

  user.set({
    role: ROLES.ADMIN,
    subRole: SUBROLES[level],
    permissions: ROLE_PERMISSIONS.ADMIN[level],
  });

  await user.save();

  res.send(user);
};

// update user to moderator
const updateModerator = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (user.role === ROLES.ADMIN) throw BadRequestError("Invalid Role");

  user.set({
    role: ROLES.MODERATOR,
    permissions: ROLE_PERMISSIONS.MODERATOR,
  });

  await user.save();

  res.send(user);
};

// assign permissions dynamically to moderator
const updateModeratorPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (user.role !== ROLES.MODERATOR) throw BadRequestError("Invalid Role");

  for (let permission of permissions) {
    if (!DYNAMIC_MODERATOR_PERMISSIONS.includes(permission))
      throw BadRequestError("Invalid Permission! Cannot be Assigned.");
  }
  user.set({ permissions: [...FIXED_MODERATOR_PERMISSIONS, ...permissions] });

  await user.save();

  res.send(user);
};

// remove admin to basic user
const removeAdmin = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");

  user.set({ role: ROLES.USER, permissions: ROLE_PERMISSIONS.USER });
  await user.save();

  res.send(user);
};

// remove moderator to basic user
const removeModerator = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (user.role !== ROLES.MODERATOR) throw BadRequestError("Invalid Role");

  user.set({ role: ROLES.USER, permissions: ROLE_PERMISSIONS.USER });
  await user.save();

  res.send(user);
};

module.exports = {
  getAllUsers,
  getAllAdmins,
  getAllModerators,
  getAllBasicUsers,
  updateAdminStatus,
  updateModeratorStatus,
  updateAdmin,
  updateModerator,
  updateModeratorPermissions,
  removeAdmin,
  removeModerator,
};
