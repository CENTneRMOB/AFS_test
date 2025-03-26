const { sampleDB } = require("../../../../services/database.service");
const { photos } = require("../../schemas");

/**
 * Добавляет данные фото.
 * @param {Object} data
 * @param {Object|null} tx
 * @return {Promise<void>}
 */
async function addOne(data, tx = null) {
  const target = tx ?? sampleDB.db;

  await target.insert(photos).values(data);
}

module.exports = { addOne };
