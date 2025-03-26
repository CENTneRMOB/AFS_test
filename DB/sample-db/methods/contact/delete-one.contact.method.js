const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { contacts, companies } = require("../../schemas");
const { editOne: editOneCompany } = require("../company");

/**
 * Софт удаление контакта.
 * @param {number} id
 * @return {Promise<string>}
 */
async function deleteOne(id) {
  // решил остановиться на софт удалении контакта - просто добавить флаг, что он удалён
  // связь с компанией всё равно удаляется, но контакт остаётся в базе, чтобы, при желании, его можно было получить

  // в целом, можно было обновить метод editOne и использовать его в качестве универсального способа, но, к.м.к удобнее иметь отдельные "интерфейсы" для этого
  const deletedContactId = await sampleDB.db.transaction(async (tx) => {
    const [{ contactId }] = await tx
      .update(contacts)
      .set({ deleted: true })
      .where(eq(contacts.id, id))
      .returning({ contactId: contacts.id });

    const [{ id: companyId }] = await tx
      .select({
        id: companies.id,
      })
      .from(companies)
      .where(eq(companies.contactId, contactId));

    await editOneCompany(companyId, { contactId: null }, tx);

    return contactId;
  });

  return deletedContactId;
}

module.exports = { deleteOne };
