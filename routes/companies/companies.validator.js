const path = require("path");
const { body, check, query } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");
const logger = require("../../services/logger.service")(module);
const imageService = require("../../services/image.service");
const { formats } = require("../../helpers");

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

const addImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  body()
    .custom((_, { req }) => req.files?.file[0])
    .withMessage({
      code: UnprocessableEntity,
      message: "file: parameter is required",
    })
    .bail()
    .custom(async (_, { req }) => {
      const file = req.files.file[0];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const tempFilePath = file.path;

      const isAllowedExtension = [".png", ".jpg", ".jpeg", ".gif"].includes(
        fileExtension
      );
      if (!isAllowedExtension) {
        await imageService
          .removeImage(tempFilePath)
          .catch((err) => logger.error(err));
      }
      return isAllowedExtension;
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "files.file: only image files are allowed to upload",
    }),
  validate,
];

const removeImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  check("image_name")
    .notEmpty()
    .withMessage((_, { path }) => ({
      code: UnprocessableEntity,
      message: `${path}: parameter is required`,
    })),
  validate,
];

const getMany = [
  query("options")
    .custom((value) => {
      if (!value) return true;

      const { filters, sort, page, limit } = value;

      if (filters) {
        if (typeof filters !== "object" || Array.isArray(filters)) {
          logger.error("Filters must be an object");
          throw new Error();
        }
        if (filters.status && typeof filters.status !== "string") {
          logger.error("Filter 'status' must be a string");
          throw new Error();
        }
        if (
          filters.type &&
          (!Array.isArray(filters.type) ||
            !filters.type.every((item) => typeof item === "string"))
        ) {
          logger.error("Filter 'type' must be an array of strings");
          throw new Error();
        }
      }

      if (sort) {
        if (typeof sort !== "object" || Array.isArray(sort)) {
          logger.error("Sort must be an object");
          throw new Error();
        }
        const validOrders = ["asc", "desc"];

        Object.values(sort).forEach((order) => {
          if (!validOrders.includes(formats.lowercase(order))) {
            logger.error(`Sort order '${order}' must be 'asc' or 'desc'`);
            throw new Error();
          }
        });
      }

      if (page) {
        if (!Number.isInteger(page) || page < 1) {
          logger.error("Page must be a positive integer");
          throw new Error();
        }
      }

      if (limit) {
        if (!Number.isInteger(limit) || limit < 1) {
          logger.error("Limit must be a positive integer");
          throw new Error();
        }
      }

      return true;
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "options: check params data",
    }),
  validate,
];

const addOne = [
  body("contactId")
    .notEmpty()
    .withMessage("contactId: parameter is required")
    .isInt({ min: 1 })
    .withMessage("contactId: parameter must be a positive integer"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("name: parameter is required")
    .isString()
    .withMessage("name: parameter must be a string"),

  body("shortName")
    .trim()
    .notEmpty()
    .withMessage("shortName: parameter is required")
    .isString()
    .withMessage("shortName: parameter must be a string"),

  body("businessEntity")
    .trim()
    .notEmpty()
    .withMessage("businessEntity: parameter is required")
    .isString()
    .withMessage("businessEntity: parameter must be a string"),

  body("contract")
    .notEmpty()
    .withMessage("contract: parameter is required")
    .isObject()
    .withMessage("contract: parameter must be an object"),

  body("status")
    .optional()
    .trim()
    .isString()
    .withMessage("status: parameter must be a string")
    .isIn(["active", "inactive"])
    .withMessage("status: parameter must be 'active' or 'inactive'"),

  body("photos")
    .optional()
    .isArray()
    .withMessage("photos: parameter must be an array"),

  body("address")
    .optional()
    .trim()
    .isString()
    .withMessage("address: parameter must be a string"),
];

module.exports = { getOne, editOne, addImage, removeImage, getMany, addOne };
