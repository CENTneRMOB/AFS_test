const { eq, sql } = require("drizzle-orm");
const { sampleDB } = require("../../../../services/database.service");
const { companies, contracts, photos } = require("../../schemas");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  // const mock = {
  //   id: 12,
  //   contactId: 16,
  //   name: "ООО Фирма «Перспективные захоронения»",
  //   shortName: "Перспективные захоронения",
  //   businessEntity: "ООО",
  //   contract: {
  //     no: "12345",
  //     issue_date: "2015-03-12T00:00:00Z",
  //   },
  //   type: ["agent", "contractor"],
  //   status: "active",
  //   photos: [
  //     {
  //       name: "0b8fc462dcabf7610a91.png",
  //       filepath: "0b8fc462dcabf7610a91.png",
  //       thumbpath: "0b8fc462dcabf7610a91_160x160.png",
  //     },
  //   ],
  //   createdAt: "2020-11-21T08:03:00Z",
  //   updatedAt: "2020-11-23T09:30:00Z",
  // };

  const [company] = await sampleDB.db
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
    .innerJoin(contracts, eq(companies.id, contracts.companyId))
    .leftJoin(photos, eq(photos.companyId, companies.id))
    .where(eq(companies.id, id))
    .groupBy(companies.id, contracts.no, contracts.issueDate);

  if (!company) {
    return null;
  }

  return company;
}

module.exports = { getOne };
