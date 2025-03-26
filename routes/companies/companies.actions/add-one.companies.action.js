const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");

/**
 * POST /companies
 * Эндпоинт добавления компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function addOne(req, res) {
  logger.init("add company");

  const newCompany = await companyMethods.addOne(req.body);

  res.status(OK).json(newCompany);
  logger.success();
}

module.exports = {
  addOne,
};
