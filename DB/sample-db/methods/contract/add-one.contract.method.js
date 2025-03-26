const { sampleDB } = require("../../../../services/database.service");
const { contracts } = require("../../schemas");

/**
 * Добавляет данные контракта.
 * @param {Object} data
 * @param {Object|null} tx
 * @return {Promise<void>}
 */
async function addOne(data, tx = null) {
  const target = tx ?? sampleDB.db;

  await target
    .insert(contracts)
    .values({ ...data, issueDate: new Date(data.issueDate) });
}

module.exports = { addOne };
