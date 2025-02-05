const express = require("express");
const auth = require("../routes/auth");
const mail = require("../routes/mail");
const user = require("../routes/user");
const routeMiddleware = require("../middlewares/invalid-route");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/mail", mail);
  app.use("/api/user", user);
  app.use(routeMiddleware);
};
