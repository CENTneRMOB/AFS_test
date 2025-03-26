const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { getUrlForRequest } = require("../../../helpers/url.helper");
const { parseMany } = require("../companies.service");

/**
 * GET /companies
 * Эндпоинт получения данных нескольких компаний.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getMany(req, res) {
  logger.init("get companies");

  const companies = await companyMethods.getMany(req.query.options);

  const photoUrl = getUrlForRequest(req);

  res.status(OK).json(parseMany(companies, photoUrl));
  logger.success();
}

module.exports = {
  getMany,
};
