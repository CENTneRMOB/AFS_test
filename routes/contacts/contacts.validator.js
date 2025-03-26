const { check, body } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const addOne = [
  body()
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "contact object is required",
    })
    .bail()
    .custom((value) => value.firstName)
    .withMessage({
      code: UnprocessableEntity,
      message: "firstName: parameter is required",
    })
    .bail()
    .custom((value) => value.lastName)
    .withMessage({
      code: UnprocessableEntity,
      message: "lastName: parameter is required",
    })
    .bail()
    .custom((value) => value.phone)
    .withMessage({
      code: UnprocessableEntity,
      message: "phone: parameter is required",
    }),

  body("email").notEmpty().isEmail().withMessage({
    code: UnprocessableEntity,
    message: "email: parameter is required and should be email format",
  }),

  body("patronymic").optional(),
  validate,
];

const deleteOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

module.exports = { getOne, editOne, addOne, deleteOne };
