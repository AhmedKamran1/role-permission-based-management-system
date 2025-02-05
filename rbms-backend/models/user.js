const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ROLES = require("../utils/constants/roles");
const { hashPassword } = require("../utils/password");
const {
  ROLE_PERMISSIONS,
  PERMISSION_ENUM,
} = require("../utils/constants/permissions");
const STATUS = require("../utils/constants/status");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(ROLES),
  },
  permissions: [
    {
      type: String,
      required: true,
      enum: Object.values(PERMISSION_ENUM),
    },
  ],
  status: {
    type: String,
    default: STATUS.PENDING,
    enum: Object.values(STATUS),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);

    if (this.role === ROLES.USER) {
      this.permissions = ROLE_PERMISSIONS.USER;
      this.status = STATUS.APPROVED;
    }
    next();
  }
});

userSchema.methods.generateAuthToken = function (expireTime) {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      permissions: this.permissions,
    },
    process.env.jwtPrivateKey,
    { expiresIn: expireTime || "3600m" }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
