const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");
const { NotFound } = require("../../../constants/errors");

/**
 * DELETE /contacts/:id
 * Эндпоинт удаления контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function deleteOne(req, res) {
  logger.init("delete contact");
  const { id } = req.params;

  const contact = await contactMethods.getOne(Number(id));
  if (!contact) {
    throw new NotFound("Contact not found");
  }

  const deletedContact = await contactMethods.deleteOne(Number(id));

  res.status(OK).json(deletedContact);
  logger.success();
}

module.exports = {
  deleteOne,
};
