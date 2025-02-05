const ERROR_CODES = require("./constants/error-codes");

module.exports.BadRequestError = (message) => {
  return {
    status: ERROR_CODES.BAD_REQUEST,
    message,
  };
};

module.exports.UnauthorizedError = (message) => {
  return {
    status: ERROR_CODES.UNAUTHORIZED,
    message,
  };
};

module.exports.NotFoundError = (message) => {
  return {
    status: ERROR_CODES.NOT_FOUND,
    message,
  };
};

module.exports.ForbiddenRequestError = (message) => {
  return {
    status: ERROR_CODES.FORBIDDEN_REQUEST,
    message,
  };
};

module.exports.InternalServerError = (message) => {
  return {
    status: ERROR_CODES.NOT_FOUND,
    message,
  };
};
