const { eq, getTableColumns, and } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { contacts } = require("../../schemas");

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {number} id
 * @return {Object|null}
 */
async function getOne(id) {
  // const mock = {
  //   id: 16,
  //   lastname: "Григорьев",
  //   firstname: "Сергей",
  //   patronymic: "Петрович",
  //   phone: "79162165588",
  //   email: "grigoriev@funeral.com",
  //   createdAt: "2020-11-21T08:03:26.589Z",
  //   updatedAt: "2020-11-23T09:30:00Z",
  // };
  // return parseInt(id, 10) === mock.id ? mock : null;

  const { deleted, ...restColumns } = getTableColumns(contacts);

  const [contact] = await sampleDB.db
    .select({ ...restColumns })
    .from(contacts)
    .where(and(eq(contacts.id, id), eq(contacts.deleted, false)));

  return contact;
}

module.exports = { getOne };
