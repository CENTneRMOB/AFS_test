const { sampleDB } = require("../../../../services/database.service");
const { companies, CompanyStatus } = require("../../schemas");
const { formats } = require("../../../../helpers");
const { addOne: addOnePhoto } = require("../photo");
const { addOne: addOneContract } = require("../contract");

/**
 * Добавляет данные о компании.
 * @param {Object} data
 * @return {Object|null}
 */
async function addOne(data) {
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

  const {
    contactId,
    name,
    shortName,
    businessEntity,
    type,
    status,
    photos,
    contract,
    address,
  } = data;

  const company = await sampleDB.db.transaction(async (tx) => {
    const [{ companyId, companyName }] = await tx
      .insert(companies)
      .values({
        contactId,
        name,
        shortName,
        businessEntity,
        type: type ? type.map(formats.lowercase) : [],
        status: status ? formats.lowercase(status) : CompanyStatus.ACTIVE,
        address: address || "",
      })
      .returning({ companyId: companies.id, companyName: companies.name });

    if (photos && photos.length) {
      await Promise.all(
        photos.map((photo) => addOnePhoto({ ...photo, companyId }, tx))
      );
    }

    await addOneContract({ ...contract, companyId }, tx);

    return {
      companyId,
      companyName,
    };
  });

  return {
    id: company.companyId,
    name: company.companyName,
  };
}

module.exports = { addOne };
