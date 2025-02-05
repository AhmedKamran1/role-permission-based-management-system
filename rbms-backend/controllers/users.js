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
const { ROLE_PERMISSIONS } = require("../utils/constants/permissions");
const ROLES = require("../utils/constants/roles");
const STATUS = require("../utils/constants/status");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

// update admin to approved/rejected from pending
const updateAdminStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (!user.isVerified) throw ForbiddenRequestError("User is not verified!");
  if (user.role !== ROLES.ADMIN) throw BadRequestError("Invalid Role");

  if (status === STATUS.APPROVED)
    user.set({ status, permissions: ROLE_PERMISSIONS.ADMIN.BASIC_ADMIN });
  else user.set({ status });

  res.send(user);
};

// update moderator to approved/rejected from pending
const updateModeratorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (!user.isVerified) throw ForbiddenRequestError("User is not verified!");
  if (user.role !== ROLES.MODERATOR) throw BadRequestError("Invalid Role");

  if (status === STATUS.APPROVED)
    user.set({ status, permissions: ROLE_PERMISSIONS.MODERATOR });
  else user.set({ status });

  await user.save();

  res.send(user);
};

// update admin to basic/super level
const updateAdminLevel = async (req, res) => {
  const { id } = req.params;
  const { level } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (!user.isVerified) throw ForbiddenRequestError("User is not verified!");
  if (!ROLE_PERMISSIONS.ADMIN[level]) throw BadRequestError("Invalid Level");
  if (user.role !== ROLES.ADMIN) throw BadRequestError("Invalid Role");

  user.set({ permissions: ROLE_PERMISSIONS.ADMIN[level] });

  await user.save();

  res.send(user);
};

// assign permissions dynamically to moderator
const updateModeratorPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) throw NotFoundError("User Not Found");
  if (!user.isVerified) throw ForbiddenRequestError("User is not verified!");
  if (!ROLE_PERMISSIONS.ADMIN[level]) throw BadRequestError("Invalid Level");
  if (user.role !== ROLES.ADMIN) throw BadRequestError("Invalid Role");

  user.set({ permissions: ROLE_PERMISSIONS.ADMIN[level] });

  await user.save();

  res.send(user);
};

module.exports = {
  getAllUsers,
  updateAdminStatus,
  updateModeratorStatus,
  updateAdminLevel,
};
