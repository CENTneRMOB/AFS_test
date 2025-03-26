const { body } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getAuth = [
  body()
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "user object is required",
    })
    .bail()
    .custom((value) => value.login)
    .withMessage({
      code: UnprocessableEntity,
      message: "login: parameter is required",
    })
    .bail()
    .custom((value) => value.password)
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required",
    }),
  validate,
];

module.exports = { getAuth };
