const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");

/**
 * POST /contacts
 * Эндпоинт добавления контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addOne(req, res) {
  logger.init("add contact");

  const newContact = await contactMethods.addOne(req.body);

  res.status(OK).json(newContact);
  logger.success();
}

module.exports = {
  addOne,
};
