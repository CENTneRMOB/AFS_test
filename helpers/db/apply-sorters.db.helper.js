const { sql } = require("drizzle-orm");
const { formats } = require("../format.helper");

const propertiesMap = {
  createdat: "created_at",
  name: "name",
};

function applySorters(query, sort, entity) {
  const orderSubqueries = Object.entries(sort).map(([key, order]) => {
    const loweredKey = formats.lowercase(key);
    const loweredOrder = formats.lowercase(order);

    return sql.raw(
      // eslint-disable-next-line security/detect-object-injection
      `"${entity}"."${propertiesMap[loweredKey]}" ${loweredOrder}`
    );
  });

  return query.orderBy(...orderSubqueries);
}

module.exports = {
  applySorters,
};
