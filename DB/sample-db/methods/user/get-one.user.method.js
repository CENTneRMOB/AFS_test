const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { users } = require("../../schemas/index");
const { formats } = require("../../../../helpers");

/**
 * Возвращает данные пользователя с указанным логином.
 * @param {string} login
 * @return {Object|null}
 */
async function getOne(login) {
  const result = await sampleDB.db
    .select()
    .from(users)
    .where(eq(users.login, formats.lowercase(login)));
  return result[0];
}

module.exports = { getOne };
