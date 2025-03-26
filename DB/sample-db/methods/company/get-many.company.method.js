const { eq, sql } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { companies, contracts, photos } = require("../../schemas");
const {
  getClarifyParams,
  applyFilters,
  applySorters,
} = require("../../../../helpers/index");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {Object|null} params
 * @return {Object|null}
 */
async function getMany(options) {
  const { filters, sort, limit, offset } = getClarifyParams(options);

  let query = sampleDB.db
    .select({
      id: companies.id,
      contactId: companies.contactId,
      name: companies.name,
      shortName: companies.shortName,
      businessEntity: companies.businessEntity,
      contract: {
        no: contracts.no,
        issueDate: contracts.issueDate,
      },
      photos:
        sql`json_agg(json_build_object('name', ${photos.name}, 'filepath', ${photos.filepath}, 'thumbpath', ${photos.thumbpath}))`.as(
          "photos"
        ),
      type: companies.type,
      status: companies.status,
      address: companies.address,
      createdAt: companies.createdAt,
      updatedAt: companies.updatedAt,
    })
    .from(companies)
    .leftJoin(contracts, eq(companies.id, contracts.companyId))
    .leftJoin(photos, eq(photos.companyId, companies.id));

  if (filters) {
    query = applyFilters(query, filters, "companies");
  }
  if (sort) {
    query = applySorters(query, sort, "companies");
  }

  query = query.groupBy(companies.id, contracts.no, contracts.issueDate);

  const count = await query;
  const companiesList = await query.limit(limit).offset(offset);

  return {
    companies: companiesList,
    count: count.length,
  };
}

module.exports = { getMany };
