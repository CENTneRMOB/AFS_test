// const { getOne } = require("./get-one.company.method");
const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { companies } = require("../../schemas");

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data, tx = null) {
  // const mock = getOne(id);

  // const updated = { ...mock };
  // Object.keys(data).forEach((key) => {
  //   updated[`${key}`] = data[`${key}`];
  // });
  // updated.updatedAt = new Date();

  // return updated;
  const target = tx ?? sampleDB.db;
  const [{ companyId, companyName }] = await target
    .update(companies)
    .set(data)
    .where(eq(companies.id, id))
    .returning({ companyId: companies.id, companyName: companies.name });

  return {
    id: companyId,
    name: companyName,
  };
}

module.exports = { editOne };
