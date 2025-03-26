const { sampleDB } = require("../../../../services/database.service");
const { contacts } = require("../../schemas");
const { formats } = require("../../../../helpers");

/**
 * Добавляет данные контакта.
 * @param {Object} data
 * @return {Object|null}
 */
async function addOne(data) {
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

  const { lastName, firstName, patronymic, phone, email } = data;

  const result = await sampleDB.db
    .insert(contacts)
    .values({
      lastName: formats.capitalize(lastName),
      firstName: formats.capitalize(firstName),
      patronymic: patronymic ? formats.capitalize(patronymic) : "",
      phone: formats.lowercase(phone),
      email: formats.lowercase(email),
    })
    .returning({ lastName: contacts.lastName, firstName: contacts.firstName });

  return result.length ? result[0] : null;
}

module.exports = { addOne };
