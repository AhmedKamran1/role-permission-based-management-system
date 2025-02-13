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

// Signup user unverified
const registerUser = async (req, res) => {
  const newUser = req.body;
  let user = await User.findOne({ email: req.body.email });
  if (user) throw BadRequestError("User already exists");
  user = await User.create(newUser);
  const token = jwt.sign(
    { email: newUser.email, tokenType: TOKENTYPES.ACCOUNT_VERIFICATION },
    process.env.jwtPrivateKey,
    {
      expiresIn: "30m",
    }
  );
  await sendMail(
    newUser.name,
    newUser.email,
    "Verify your account",
    `http://localhost:3000/verification?token=${token}`
  );
  res
    .status(201)
    .send({ message: "User Created! Verification link sent at email." });
};

// verify user
const verifyUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) throw NotFoundError("User does not exist");
  if (user.isVerified) throw BadRequestError("User is already verified!");
  user.set({ isVerified: true });
  await user.save();

  res.send({ message: "User verified successfully!" });
};

// update user password
const updatePassword = async (req, res) => {
  const newPassword = req.body.password;
  const user = await User.findOne({ email: req.user.email });
  console.log(req.user.email);
  if (!user) throw NotFoundError("User does not exist");

  user.set({ password: newPassword });
  await user.save();

  res.send({ message: "Password updated successfully!" });
};

// login user
const loginUser = async (req, res) => {
  const credentials = req.body;
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) throw NotFoundError("User does not exist");
  const isValid = await validatePassword(credentials.password, user.password);
  if (!isValid) throw BadRequestError("Invalid Credentials");
  if (!user.isVerified)
    throw ForbiddenRequestError("User is not verified! Verify user to login.");
  const token = user.generateAuthToken();

  res.send({
    details: {
      name: user.name,
      email: user.email,
      role: user.role,
      subRole: user.subRole || null,
      status: user.status,
      permissions: user.permissions,
    },
    token: token,
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  updatePassword,
};
