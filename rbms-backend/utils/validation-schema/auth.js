const JoiInstance = require("../joi-instance");

// Joi validation schema for adding a new user

const adminSchema = JoiInstance.object({
  name: JoiInstance.string().required(),
  email: JoiInstance.string().email().required(),
  password: JoiInstance.string().required(),
  role: JoiInstance.string().required(),
  accessLevel: JoiInstance.number().required().min(2).max(3),
});

const userSchema = JoiInstance.object({
  name: JoiInstance.string().required(),
  email: JoiInstance.string().email().required(),
  password: JoiInstance.string().required(),
  accessLevel: JoiInstance.number().required().min(1).max(3),
});

const passwordSchema = JoiInstance.object({
  password: JoiInstance.string().required(),
});

const emailSchema = JoiInstance.object({
  email: JoiInstance.string().email().required(),
});

const loginSchema = JoiInstance.object()
  .concat(emailSchema)
  .concat(passwordSchema);

module.exports = {
  adminSchema,
  userSchema,
  passwordSchema,
  loginSchema,
};
