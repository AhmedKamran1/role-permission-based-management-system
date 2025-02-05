const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

const authenticate = (req, res, next) => {
  const token = req.header("authorization")?.substring("Bearer ".length);

  if (!token) throw UnauthorizedError("Access Denied. No token found!");

  const decoded = jwt.verify(token, process.env.jwtPrivateKey);
  req.user = decoded;

  next();
};

module.exports = authenticate;
