const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");

module.exports = Router().post(
  // возможно, использовать "/login" было бы лучше
  "/users/auth",
  ...validator.getAuth,
  actions.getAuth
);
