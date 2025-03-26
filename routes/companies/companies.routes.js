const multer = require("multer");
const { Router } = require("express");
const actions = require("./companies.actions");
const validator = require("./companies.validator");
const config = require("../../config");
const { parseJson } = require("../../middleware/query-parser.middleware");

const fileHandler = multer({ dest: config.images.uploadsDir });

module.exports = Router()
  .get("/companies/:id", ...validator.getOne, actions.getOne)
  .get(
    "/companies",
    parseJson("options"),
    ...validator.getMany,
    actions.getMany
  )
  .patch("/companies/:id", ...validator.editOne, actions.editOne)
  .post(
    "/companies/:id/image",
    fileHandler.fields([{ name: "file", maxCount: 1 }]),
    ...validator.addImage,
    actions.addImage
  )
  .delete("/companies/:id/image", ...validator.removeImage, actions.removeImage)
  .post("/companies", ...validator.addOne, actions.addOne);
